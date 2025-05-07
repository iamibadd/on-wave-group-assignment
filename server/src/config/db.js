const mysql = require("mysql2");
const config = require("./config");

const db = mysql.createConnection({
  host: config.mysqldb.host,
  user: config.mysqldb.user,
  password: config.mysqldb.password,
  database: config.mysqldb.name,
});

module.exports = db;
