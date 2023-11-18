const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_TOKEN;

module.exports = {
  sign: (payload) => {
    const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1d" });
    return { accessToken };
  },
  verify: (token) => {
    const payload = jwt.verify(token, secretKey);
    return payload;
  },
};
