const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Welcome again");
});

router.post("/signup", authController.signupUser);

module.exports = router;
