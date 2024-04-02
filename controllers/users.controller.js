const services = require("../services/users.service");
const { ERR_NOT_FOUND } = require("../utils/error");

module.exports = {
  AllUsers: async (req, res, next) => {
    const users = await services.getAllUsers();
    users.map((user) => ({
      ...user,
      password: (user.password = "********"),
    }));

    res.send(users);
  },
  getById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await services.getUserById(id);
      services.clearUser(user);
      res.send(user);
    } catch (error) {
      return next(ERR_NOT_FOUND);
    }
  },

  updateUser: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await services.updateUser(id, req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  },

  deleteById: async (req, res, next) => {
    const { id } = req.params;
    try {
      await services.deleteById(id);
      res.send("User deleted");
    } catch (error) {
      console.error(error);
    }
  },
};
