const schema = {
  type: "object",
  properties: {
    firstname: { type: "string", isNotEmpty: true },
    lastname: { type: "string" },
    email: { type: "string" },
    password: { type: "string", isNotEmpty: true },
    phonenumber: { type: "string", isNotEmpty: true },
  },
  required: ["firstname", "lastname", "email", "password", "phonenumber"],
  additionalProperties: true,
};

module.exports = schema;
