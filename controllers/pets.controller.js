const petsService = require("../services/pets.service");
const { ERR_NOT_FOUND } = require("../utils/error");

module.exports = {
  addPet: async (req, res, next) => {
    try {
      const pet = await petsService.addPet(req.body);

      res.send(pet.insertedId);
    } catch (error) {
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

  adoptPet: async (req, res, next) => {
    const { id } = req.params;

    const { adoptionStatus } = req.body;

    try {
      if (adoptionStatus === "available" || adoptionStatus == "fostered") {
        const pet = await petsService.getPetByStatus(adoptionStatus, id);

        res.send(pet);
      } else {
        next(ERR_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
    }
  },

  fosterPet: async (req, res, next) => {
    const { id } = req.params;
    const { adoptionStatus } = req.body;

    try {
      if (adoptionStatus === "available" || adoptionStatus === "adopted") {
        const pet = await petsService.getPetByStatus(adoptionStatus, id);

        res.send(pet);
      } else {
        next(ERR_NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
    }
  },

  updatePet: async (req, res, next) => {
    const { id } = req.params;
    try {
      const petAdopted = await petsService.updatePet(id, req.body);
      res.send(petAdopted);
    } catch (error) {
      console.error(error);
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
