function validateCreateUser(request, response, next) {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    const error = new Error("Required fields missing");
    error.status = 400;
    return next(error);
  }

  next();
}

module.exports = {
  validateCreateUser,
};
