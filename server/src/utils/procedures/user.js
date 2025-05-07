const createTable = (db) => {
  db.query(
    `
    CREATE TABLE IF NOT EXISTS users (
      ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
      password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
      type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
      active TINYINT DEFAULT 1
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating users table:", err);
        return { err };
      }
    }
  );
};

const createAddUserProcedure = (db) => {
  const dropQuery = `DROP PROCEDURE IF EXISTS addUser`;
  const createQuery = `
      CREATE PROCEDURE addUser(
        IN p_email VARCHAR(255),
        IN p_password VARCHAR(255),
        IN p_type VARCHAR(255),
        IN p_active TINYINT
      )
      BEGIN
        INSERT INTO users (email, password, type, active)
        VALUES (p_email, p_password, p_type, p_active);
      END
    `;

  return new Promise((resolve, reject) => {
    db.query(dropQuery, (err) => {
      if (err) {
        console.error("Error dropping procedure:", err);
        return reject(err);
      }

      db.query(createQuery, (err) => {
        if (err) {
          console.error("Error creating procedure:", err);
          return reject(err);
        }

        console.info("Stored procedure 'addUser' created successfully.");
        resolve();
      });
    });
  });
};

const addUserViaProcedure = (db, email, password, type, active = 1) => {
  return new Promise((resolve, reject) => {
    const callQuery = `CALL addUser(?, ?, ?, ?)`;
    db.query(callQuery, [email, password, type, active], (err) => {
      if (err) {
        console.error("Error calling addUser procedure:", err);
        return reject(err);
      }
      console.info(`User ${email} added successfully.`);
      resolve();
    });
  });
};

module.exports = {
  createTable,
  createAddUserProcedure,
  addUserViaProcedure,
};
