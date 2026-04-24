const Sequelize = require("sequelize");

const db =
  process.env.NODE_ENV === "PROD"
    ? new Sequelize(process.env.DB_CONNECTION_STRING)
    : new Sequelize(process.env.DB_TEST_CONNECTION_STRING);

(async function () {
  try {
    await db.authenticate();
    await db.sync({ force: true });
    const Hubs = require("../models/Hubs");
    await Hubs.sync({ alter: true }).then(async () => {
      Hubs.bulkCreate([
        { name: "JavaScript", subscribers: 484, adminHub: true },
        { name: "Cpp", subscribers: 326, adminHub: true },
        { name: "React", subscribers: 379, adminHub: true },
        { name: "Java", subscribers: 473, adminHub: true },
        { name: "Bash", subscribers: 433, adminHub: true },
        { name: "C", subscribers: 441, adminHub: true },
        { name: "CSharp", subscribers: 651, adminHub: true },
        { name: "Clojure", subscribers: 852, adminHub: true },
        { name: "CoffeeScript", subscribers: 412, adminHub: true },
        { name: "CSS", subscribers: 244, adminHub: true },
        { name: "Dart", subscribers: 94, adminHub: true },
        { name: "Docker", subscribers: 185, adminHub: true },
        { name: "Go", subscribers: 148, adminHub: true },
        { name: "Gradle", subscribers: 81, adminHub: true },
        { name: "GraphQL", subscribers: 789, adminHub: true },
        { name: "Haskell", subscribers: 481, adminHub: true },
        { name: "JSON", subscribers: 564, adminHub: true },
        { name: "Kotlin", subscribers: 432, adminHub: true },
        { name: "MongoDB", subscribers: 345, adminHub: true },
        { name: "ObjectiveC", subscribers: 432, adminHub: true },
        { name: "Perl", subscribers: 764, adminHub: true },
        { name: "Pug", subscribers: 238, adminHub: true },
        { name: "Python", subscribers: 983, adminHub: true },
        { name: "R", subscribers: 435, adminHub: true },
        { name: "RegEx", subscribers: 139, adminHub: true },
        { name: "Ruby", subscribers: 403, adminHub: true },
        { name: "Rust", subscribers: 123, adminHub: true },
        { name: "SASS", subscribers: 433, adminHub: true },
        { name: "Scala", subscribers: 323, adminHub: true },
        { name: "Swift", subscribers: 983, adminHub: true },
        { name: "TypeScript", subscribers: 623, adminHub: true },
        { name: "YAML", subscribers: 33, adminHub: true },
      ]);
    });
    console.log(
      process.env.NODE_ENV === "test"
        ? "we have connect to our local test DB"
        : "we have connected to our Cloud DB",
    );
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;

//     : new Sequelize(`${process.env.DB_EXTERNAL_URL}?ssl=true`);
