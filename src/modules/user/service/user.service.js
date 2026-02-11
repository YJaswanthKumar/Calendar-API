/* global process */

const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    return { error: "Required fields missing", status: 400 };
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return { error: "Email already registered", status: 400 };
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return user;
};

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    return { error: "Email and password required", status: 400 };
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !user.password) {
    return { error: "Invalid credentials", status: 401 };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return { error: "Invalid credentials", status: 401 };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "6h" },
  );

  return { token };
};

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      error: "User not found",
      status: 404,
    };
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};
