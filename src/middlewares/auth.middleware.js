/* global process */

const jwt = require("jsonwebtoken");

const authenticatingUser = async (request, response, next) => {
  let jwtToken;
  const authHead = request.headers["authorization"];
  if (authHead !== undefined) {
    jwtToken = authHead.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401).send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        response.status(401).send("Unauthorized");
      } else {
        request.username = { username: payload.username };
        next();
      }
    });
  }
};

module.exports = {
  authenticatingUser,
};
