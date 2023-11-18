const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hashPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  },
  validatePassword: (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err || !result) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
