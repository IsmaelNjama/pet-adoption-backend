require("dotenv").config();
require("./utils/mongodb").run();
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

//routes

app.use("/auth", require("./routes/auth.routes"));

app.use("/users", require("./routes/users.route"));

//error handler
app.use((err, req, res, next) => {
  try {
    const [statusCode, msg] = err;
    res.status(statusCode).send({
      error: true,
      message: msg,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`listening.... on port ${PORT}`));
