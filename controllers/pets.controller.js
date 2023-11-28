const petsService = require("../services/pets.service");

module.exports = {
  addPet: async (req, res, next) => {
    try {
      const pet = await petsService.addPet(req.body);

      res.send(pet.insertedId);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getPets: async (req, res, next) => {
    try {
      const pets = await petsService.getAllPets();

      res.send(pets);
    } catch (error) {
      next(error);
    }
  },
  getPetById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const petById = await petsService.getPetById(id);
      res.send(petById);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getByBasicQuery: async (req, res, next) => {
    const { q } = req.query;
    try {
      const petsList = await petsService.getPetsByBasicQuery(q);
      res.send(petsList);
    } catch (error) {
      next(error);
    }
  },

  getByAdvancedQuery: async (req, res, next) => {
    const { q } = req.query;
    try {
      const petsList = await petsService.getPetsByAdvancedQuery(q);
      res.send(petsList);
    } catch (error) {
      next(error);
    }
  },

  deletePetById: async (req, res, next) => {
    const { id } = req.params;
    try {
      await petsService.deletePetById(id);
      res.send("deleted");
    } catch (error) {
      next(error);
    }
  },
};
