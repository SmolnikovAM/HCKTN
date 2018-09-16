const Knex = require("knex");

const db = new Knex({
  client: "sqlite3",
  userNullAsDefault: true,
  connection: {
    filename: "./test.sqlite"
  }
});

module.exports = db;
