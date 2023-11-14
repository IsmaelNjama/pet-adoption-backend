const usersService = require("../services/users.service");
const { ERR, REGISTER_ALREADY_EXIST } = require("../utils/error");

module.exports = {
  signupUser: async (req, res, next) => {
    console.log(req.body);
    const { email } = req.body;

    try {
      const user = await usersService.getUserByEmail(email);
      if (user) {
        return next(REGISTER_ALREADY_EXIST);
      }

      const newUser = await usersService.addUser(req.body);
      console.log();

      res.send(newUser);
    } catch (error) {
      next(ERR);
    }
  },
};
