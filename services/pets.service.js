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
  getPetsByBasicQuery: (q) => {
    const query = new RegExp(q, "i");
    return new Promise(async (resolve, reject) => {
      try {
        const petsByBasicQuery = await pets()
          .find({ type: { $regex: query } })
          .toArray();
        resolve(petsByBasicQuery);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },

  getPetsByAdvancedQuery: (q) => {
    const query = new RegExp(q, "i");
    return new Promise(async (resolve, reject) => {
      try {
        const petsByAdvancedQuery = await pets()
          .find({
            $or: [
              { adoption_status: query },
              { height: query },
              { weight: query },
              { type: query },
              { name: query },
            ],
          })
          .toArray();
        resolve(petsByAdvancedQuery);
      } catch (error) {
        console.log(error);
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
