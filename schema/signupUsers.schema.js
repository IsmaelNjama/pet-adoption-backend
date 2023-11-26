const schema = {
  type: "object",
  properties: {
    firstname: { type: "string", isNotEmpty: true },
    lastname: { type: "string", isNotEmpty: true },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    phonenumber: { type: "string" },
  },
  required: ["firstname", "lastname", "email", "password", "phonenumber"],
  additionalProperties: true,
};

module.exports = schema;
