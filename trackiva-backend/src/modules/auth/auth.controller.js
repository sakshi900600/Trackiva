import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(201).json({ success: true, message: "User registered successfully", data: result });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message || "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.json({ success: true, message: "Login successful", data: result });
  } catch (err) {
    return res.status(err.statusCode || 401).json({ success: false, message: err.message || "Login failed" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    const result = await authService.googleAuth(idToken);
    return res.json({ success: true, message: "Google auth successful", data: result });
  } catch (err) {
    return res.status(err.statusCode || 401).json({ success: false, message: err.message || "Google auth failed" });
  }
};

export const getProfile = async (req, res) => {
  try {
    return res.json({ success: true, data: req.user });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    return res.json({ success: true, message: result.message });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(req.params.token, req.body.password);
    return res.json({ success: true, message: result.message });
  } catch (err) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }
};