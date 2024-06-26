const usersService = require("../services/users.service");
const { hashPassword, validatePassword } = require("../utils/bycrypt");
const jwt = require("../utils/jwt");
const {
  ERR,
  REGISTER_ALREADY_EXIST,
  ERR_NOT_FOUND,
  ERR_BAD_REQUEST,
} = require("../utils/error");

module.exports = {
  signupUser: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await usersService.getUserByEmail(email);
      if (user) {
        return next(REGISTER_ALREADY_EXIST);
      }

      const hash = await hashPassword(password);

      const newUser = await usersService.addNormalizedUser(req.body, hash);

      res.send(newUser);
    } catch (error) {
      next(ERR);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.getUserByEmail(email);

      if (!user) {
        return next(ERR_NOT_FOUND);
      }

      await validatePassword(password, user.password);

      usersService.clearUser(user);
      const payload = { id: user._id.toString() };
      const token = jwt.sign(payload);

      res.send({ token, user });
    } catch (error) {
      next(ERR_BAD_REQUEST);
    }
  },
};
