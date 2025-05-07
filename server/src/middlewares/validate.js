const { addUserSchema } = require("./schemas");
const config = require("../config/config");

const validateFiles = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }
  next();
};

const verifyProcedureFlag = (req, res, next) => {
  if (config.mysqldb.runStoreProceduresOnStart === "TRUE") {
    return res.status(400).json({
      error:
        "Procedure can only be run when the application starts. Check the app config values.",
    });
  }

  next();
};

const validateAddUser = (req, res, next) => {
  const { error, value } = addUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Replace request body with validated and sanitized data
  req.body = value;
  next();
};

module.exports = { validateFiles, validateAddUser, verifyProcedureFlag };
