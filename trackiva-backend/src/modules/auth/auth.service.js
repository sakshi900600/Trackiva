import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "./auth.model.js";
import { OAuth2Client } from "google-auth-library";
import { validateEmail } from "../../utils/emailValidator.js";
import { sendPasswordResetEmail } from "../../utils/mailer.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ── Register ──────────────────────────────────────────────
export const registerUser = async ({ name, email, password }) => {
  if (!name?.trim())
    throw Object.assign(new Error("Name is required"), { statusCode: 400 });

  const emailCheck = await validateEmail(email);
  if (!emailCheck.valid)
    throw Object.assign(new Error(emailCheck.reason), { statusCode: 400 });

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing)
    throw Object.assign(
      new Error("An account with this email already exists"),
      { statusCode: 409 }
    );

  if (!password || password.length < 6)
    throw Object.assign(
      new Error("Password must be at least 6 characters"),
      { statusCode: 400 }
    );

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password,
  });
  const token = generateToken(user._id);
  return { user, token };
};

// ── Login ──────────────────────────────────────────────────
export const loginUser = async ({ email, password }) => {
  if (!email || !password)
    throw Object.assign(
      new Error("Email and password are required"),
      { statusCode: 400 }
    );

  const emailCheck = await validateEmail(email);
  if (!emailCheck.valid)
    throw Object.assign(new Error(emailCheck.reason), { statusCode: 400 });

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  if (user.googleId && !user.password)
    throw Object.assign(
      new Error("This account uses Google Sign-In. Please login with Google."),
      { statusCode: 400 }
    );

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

// ── Google Auth ────────────────────────────────────────────
export const googleAuth = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { sub, email, name, picture } = ticket.getPayload();

  // Google-verified emails are inherently valid — skip MX check
  let user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    user = await User.create({
      name,
      email: email.toLowerCase(),
      googleId: sub,
      avatar: { url: picture },
      isVerified: true,
    });
  } else if (!user.googleId) {
    // Link Google to existing account
    user.googleId = sub;
    if (!user.avatar?.url && picture) user.avatar = { url: picture };
    user.isVerified = true;
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);
  return { user, token };
};

// ── Forgot Password ────────────────────────────────────────
export const forgotPassword = async (email) => {
  if (!email)
    throw Object.assign(new Error("Email is required"), { statusCode: 400 });

  const emailCheck = await validateEmail(email);
  if (!emailCheck.valid)
    throw Object.assign(new Error(emailCheck.reason), { statusCode: 400 });

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // Don't reveal whether user exists — but still try to send if they do
  if (!user || user.googleId) {
    return { message: "If that email is registered, a reset link has been sent." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // This will throw with statusCode 500 if email fails — error bubbles to controller
  await sendPasswordResetEmail(user.email, user.name, resetUrl);

  return { message: "If that email is registered, a reset link has been sent." };
};

// ── Reset Password ─────────────────────────────────────────
export const resetPassword = async (resetToken, newPassword) => {
  if (!newPassword || newPassword.length < 6)
    throw Object.assign(
      new Error("Password must be at least 6 characters"),
      { statusCode: 400 }
    );

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    throw Object.assign(
      new Error("Reset link is invalid or has expired"),
      { statusCode: 400 }
    );

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { message: "Password reset successfully" };
};