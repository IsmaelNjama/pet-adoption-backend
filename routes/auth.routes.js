const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../utils/schemaValidate");
const signupUserSchema = require("../schema/signupUsers.schema");
const router = express.Router();

router.post("/login", authController.loginUser);

router.post("/signup", validate(signupUserSchema), authController.signupUser);

module.exports = router;
