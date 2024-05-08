// controllers/authController.js
const User = require('../model/app');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({ fullName, email, phone, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const generateResetToken = (userId) => {
  return jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });
};

const validateResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

exports.sendResetLink = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = generateResetToken(user._id);
    // Send resetToken to user's email
    res.status(200).json({ message: "Reset link sent", token: resetToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword, confirmPassword, token, id } = req.body;
  if (newPassword!== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const userId = validateResetToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};