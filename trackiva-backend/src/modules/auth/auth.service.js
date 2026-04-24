import jwt from "jsonwebtoken";
import User from "./auth.model.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  return { user, token };
};

// Login
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  return { user, token };
};

// Google Auth
export const googleAuth = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      googleId: sub,
      avatar: { url: picture },
      isVerified: true,
    });
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  return { user, token };
};