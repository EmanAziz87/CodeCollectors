const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = async () => {
  const db = new Sequelize(process.env.DB_TEST_CONNECTION_STRING);
  await db.authenticate();
  await db.sync({ force: true });
  await db.close();
};
