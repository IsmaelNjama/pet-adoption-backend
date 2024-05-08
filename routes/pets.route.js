const express = require("express");
const petsController = require("../controllers/pets.controller");
const router = express.Router();

router.post("/", petsController.addPet);
router.get("/", petsController.getPets);
router.get("/firstThreePets", petsController.getTheFirstThreePets);
router.get("/search/basic", petsController.getByBasicQuery);
router.get("/search/advanced", petsController.getByAdvancedQuery);
router.post("/adopt/:id", petsController.adoptPet);
router.post("/foster/:id", petsController.fosterPet);
router.get("/:id", petsController.getPetById);
router.put("/:id", petsController.updatePet);

router.delete("/:id", petsController.deletePetById);

module.exports = router;
