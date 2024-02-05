const Sequelize = require('sequelize');

const db =
  process.env.NODE_ENV === 'test'
    ? new Sequelize('cctestdb', 'postgres', 'myPassword', {
        dialect: 'postgres',
      })
    : new Sequelize(`${process.env.DB_EXTERNAL_URL}?ssl=true`);

(async () => {
  try {
    db.authenticate();
    console.log(
      process.env.NODE_ENV === 'test'
        ? 'we have connect to our local test DB'
        : 'we have connected to our Cloud DB'
    );
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;
