const express = require("express");
const router = express.Router();

const {
  createUserHandler,
  loginUserHandler,
  getUserHandler,
} = require("../interface/user.controller");

const {
  validateCreateUser,
} = require("../../../middlewares/validateUser.middleware.js");
const {
  authenticatingUser,
} = require("../../../middlewares/auth.middleware.js");

router.post("/register", validateCreateUser, createUserHandler);
router.post("/login", loginUserHandler);
router.get("/:id", authenticatingUser, getUserHandler);

module.exports = router;
