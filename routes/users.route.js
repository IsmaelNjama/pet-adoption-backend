const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();

router.get("/", usersController.AllUsers);
router.get("/:id", usersController.getById);
router.delete("/:id", usersController.deleteById);

module.exports = router;
