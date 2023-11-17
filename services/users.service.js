const users = require("../utils/mongodb").users;

const services = {
  addUser: async (body) => {
    const user = await users().insertOne(body);
    return user;
  },
  addNormalizedUser: async (body, hash) => {
    return await services.addUser({ ...body, password: hash });
  },
  getAllUsers: async () => {
    const usersList = await users().find({}).toArray();
    return usersList;
  },
  getUserByEmail: async (email) => {
    const user = await users().findOne({ email });
    return user;
  },
};

module.exports = services;
