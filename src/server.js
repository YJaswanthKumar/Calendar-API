require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

require("./modules/user/model/user.model");
require("./modules/meeting/model/meeting.model");

const PORT = 3000;

sequelize.sync().then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
