const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(5000),
    DB_HOST: Joi.string().required().description("MYSQL DB Host"),
    DB_NAME: Joi.string().required().description("MYSQL DB Name"),
    DB_USER: Joi.string().required().description("MYSQL DB User"),
    DB_PASSWORD: Joi.string().required().description("MYSQL DB Password"),
    RUN_DB_PROCEDURES_ON_START: Joi.string()
      .required()
      .valid("TRUE", "FALSE")
      .description("MYSQL DB Store Procedures"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  mysqldb: {
    host: envVars.DB_HOST,
    name: envVars.DB_NAME,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    runStoreProceduresOnStart: envVars.RUN_DB_PROCEDURES_ON_START,
  },
};
