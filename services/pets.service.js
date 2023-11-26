const { ObjectId } = require("mongodb");

const pets = require("../utils/mongodb").pets;

const services = {
  addPet: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pet = await pets().insertOne(body);
        resolve(pet);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllPets: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allPets = await pets().find({}).toArray();
        resolve(allPets);
      } catch (error) {
        reject(error);
      }
    });
  },
  getPetById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const petById = await pets().findOne({ _id: new ObjectId(id) });
        resolve(petById);
      } catch (error) {
        reject(error);
      }
    });
  },

  deletePetById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedPet = await pets().deleteOne({ _id: new ObjectId(id) });
        resolve(deletedPet);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = services;
