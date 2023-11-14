const services = require("../services/users.service");

module.exports = {
  AllUsers: async (req, res, next) => {
    const users = await services.getAllUsers();
    res.send(users);
  },
};
