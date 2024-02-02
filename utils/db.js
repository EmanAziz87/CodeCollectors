const Sequelize = require('sequelize');

const db = new Sequelize(`${process.env.DB_EXTERNAL_URL}?ssl=true`);

(async () => {
  try {
    db.authenticate();
    console.log('we have connected to our Postgres DB');
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;
