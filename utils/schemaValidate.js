const ajv = require("./ajv");

const validate = (schema) => {
  return (req, res, next) => {
    const data = req.body;

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.log(validate.error);
      return res.status(400).send({ error: validate.error });
    }
    next();
  };
};

module.exports = validate;
