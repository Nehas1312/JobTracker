import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const registerService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const loginService = async ({ email, password }) => {
  // We need password here so we explicitly select it
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const getMeService = async (userId) => {
  const user = await User.findById(userId);
  return { id: user._id, name: user.name, email: user.email };
};
