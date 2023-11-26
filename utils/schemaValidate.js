const ajv = require("./ajv");

const validate = (schema) => {
  return (req, res, next) => {
    const data = req.body;

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      console.log(validate.errors);
      const message = validate.errors
        .map((item) => {
          return `${item.instancePath.slice(1)}:${item.message}`;
        })
        .join(" , ");
      // return res.status(400).send({ error: validate.errors });
      return next([400, message]);
    }
    next();
  };
};

module.exports = validate;
