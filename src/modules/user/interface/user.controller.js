const { registerUser } = require("../service/user.service.js");
const { loginUser } = require("../service/user.service");
const { getUserById } = require("../service/user.service");

const createUserHandler = async (request, response, next) => {
  try {
    const user = await registerUser(request.body);

    if (user.error) {
      const error = new Error(user.error);
      error.status = user.status;
      return next(error);
    }

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

const loginUserHandler = async (request, response, next) => {
  try {
    const result = await loginUser(request.body);
    if (result.error) {
      const error = new Error(result.error);
      error.status = result.status;
      return next(error);
    }
    return response.status(200).json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

const getUserHandler = async (request, response, next) => {
  const result = await getUserById(request.params.id);

  if (result.error) {
    const error = new Error(result.error);
    error.status = result.status;
    return next(error);
  }

  response.status(200).json(result);
};

module.exports = {
  createUserHandler,
  loginUserHandler,
  getUserHandler,
};
