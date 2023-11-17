const usersService = require("../services/users.service");
const { hashPassword } = require("../utils/bycrypt");
const { ERR, REGISTER_ALREADY_EXIST } = require("../utils/error");

module.exports = {
  signupUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await usersService.getUserByEmail(email);
      if (user) {
        return next(REGISTER_ALREADY_EXIST);
      }

      const hash = await hashPassword(password);

      // console.log(newUserBody);
      const newUser = await usersService.addNormalizedUser(req.body, hash);

      res.send(newUser);
    } catch (error) {
      console.log(error);
      next(ERR);
    }
  },
};
