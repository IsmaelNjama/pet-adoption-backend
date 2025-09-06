require("dotenv").config();
require("./utils/mongodb").run();
const isAuthMiddleware = require("./middlewares/auth.middleware");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const express = require("express");
const logger = require("./utils/logger");
const limiter = require("./utils/limiter");

const PORT = process.env.PORT || 8080;
const cors = require("cors");

const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "DELETE"],
  })
);

// app.use(limiter);

app.use(isAuthMiddleware);

//routes

app.use("/health", require("./routes/health.route"));

app.use("/auth", require("./routes/auth.routes"));

app.use("/users", require("./routes/users.route"));

app.use("/pets", require("./routes/pets.route"));

//error handler
app.use(errorHandlerMiddleware);

// app.listen(PORT, () => console.log(`server listening... on port ${PORT}`));
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, {
    port: PORT,
    env: process.env.NODE_ENV || "development",
  });
});
