const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Calendar API Running");
});

const meetingRoutes = require("./modules/meeting/routes/meeting.routes");
const usersRoutes = require("./modules/user/routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");

app.use("/users", usersRoutes);
app.use("/meetings", meetingRoutes);
app.use(errorHandler);

app.post("/test", (request, response) => {
  return response.send("Route works");
});

module.exports = app;
