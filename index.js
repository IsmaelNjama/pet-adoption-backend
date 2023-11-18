require("dotenv").config();
require("./utils/mongodb").run();
const jwt = require("./utils/jwt");
const services = require("./services/users.service");
const express = require("express");

const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { ERR_UNAUTHORIZED } = require("./utils/error");

const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(async (req, res, next) => {
  const publicRoutes = [
    { method: "POST", url: "/auth/signup" },
    { method: "POST", url: "/auth/login" },
  ];

  const isPublicRoute = publicRoutes.find(
    (endpoint) => req.method === endpoint.method && req.url === endpoint.url
  );
  if (isPublicRoute) {
    return next();
  }
  const { authorization: token } = req.headers;

  if (!token) {
    return next(ERR_UNAUTHORIZED);
  }
  try {
    const payload = jwt.verify(token);
    const user = await services.getUserById(payload.id);
    req.user = user;
  } catch (error) {
    return next(ERR_UNAUTHORIZED);
  }
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
