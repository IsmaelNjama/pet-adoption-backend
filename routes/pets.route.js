const express = require("express");
const petsController = require("../controllers/pets.controller");
const router = express.Router();

router.post("/", petsController.addPet);
router.get("/", petsController.getPets);
router.get("/search/basic", petsController.getByBasicQuery);
router.get("/search/advanced", petsController.getByAdvancedQuery);
router.get("/:id", petsController.getPetById);

router.delete("/:id", petsController.deletePetById);

module.exports = router;
