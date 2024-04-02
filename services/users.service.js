const { ObjectId } = require("mongodb");

const users = require("../utils/mongodb").users;

const services = {
  addUser: async (body) => {
    const user = await users().insertOne(body);
    return user;
  },
  addNormalizedUser: async (body, hash) => {
    return await services.addUser({ ...body, password: hash });
  },
  clearUser: (user) => {
    delete user.password;
  },

  getAllUsers: async () => {
    const usersList = await users().find({}).toArray();

    return usersList;
  },
  getUserByEmail: async (email) => {
    const user = await users().findOne({ email });
    return user;
  },

  getUserById: async (id) => {
    const user = await users().findOne({ _id: new ObjectId(id) });
    return user;
  },

  updateUser: async (id, body) => {
    const user = await users().updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return user;
  },

  deleteById: async (id) => {
    await users().deleteOne({ _id: new ObjectId(id) });
  },
};

module.exports = services;
