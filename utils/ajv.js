const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

addFormats(ajv);

ajv.addKeyword("isNotEmpty", {
  type: "string",
  validate: (data) => {
    return typeof data === "string" && data.trim() !== "";
  },
  error: {
    message: "string field must not be empty",
  },
});

module.exports = ajv;
