import { validationResult } from "express-validator";
import { registerService, loginService, getMeService } from "./auth.service.js";

// @route  POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const result = await registerService(req.body);
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route  POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const result = await loginService(req.body);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

// @route  GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
