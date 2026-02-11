// eslint-disable-next-line no-unused-vars
function errorHandler(error, request, response, next) {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  response.status(status).json({
    error: message,
  });
}

module.exports = errorHandler;
