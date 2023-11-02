require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8080;
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  console.log("middleware working okay");
  next();
});

app.post("/signup", (req, res) => {
  res.send("Welcome");
});

app.post("/login", (req, res) => {
  res.send("Welcome back");
});

app.listen(PORT, () => console.log(`listening.... on port ${PORT}`));
