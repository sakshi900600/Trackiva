import * as authService from "./auth.service.js";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
};


// LOGIN
export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    return res.status(err.statusCode || 401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};


// GOOGLE LOGIN
export const googleLogin = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    const result = await authService.googleAuth(idToken);

    return res.json({
      success: true,
      message: "Google auth successful",
      data: result,
    });
  } catch (err) {
    return res.status(err.statusCode || 401).json({
      success: false,
      message: err.message || "Google auth failed",
    });
  }
};



export const getProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};