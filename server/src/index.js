const app = require("./app");
const config = require("./config/config");
const db = require("./config/db");
const {
  createTable,
  createAddUserProcedure,
  addUserViaProcedure,
} = require("./utils/procedures/user");

let server;
db.connect(async (err) => {
  if (err) {
    console.error("Failed to connect to DB: ", err);
    return;
  }
  console.info("Connected to DB");
  createTable(db);
  if (config.mysqldb.runStoreProceduresOnStart === "TRUE") {
    await createAddUserProcedure(db);
    const email = "iamibadd@gmail.com";
    const password = "9214s818";
    const type = "member";
    const active = 1;
    await addUserViaProcedure(db, email, password, type, active);
  }

  server = app.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
