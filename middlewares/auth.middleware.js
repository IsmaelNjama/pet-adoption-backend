const jwt = require("../utils/jwt");
const { ERR_UNAUTHORIZED } = require("../utils/error");
const services = require("../services/users.service");

module.exports = async (req, res, next) => {
  const publicRoutes = [
    { method: "POST", url: "/auth/signup" },
    { method: "POST", url: "/auth/login" },
    { method: "GET", url: "/pets/search/basic" },
    { method: "GET", url: "/pets/firstThreePets" },
    { method: "GET", url: "/health" },
    { method: "GET", url: "/health/" },
    { method: "GET", url: "/health/liveness" },
  ];

  const isPublicRoute = publicRoutes.find((endpoint) => {
    if (req.method !== endpoint.method) return false;
    if (endpoint.url instanceof RegExp) {
      return endpoint.url.test(req.url);
    }
    return endpoint.url === req.url;
  });
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
  // console.log("The middleware logs!!!");
  logger.info("The middleware running logs");
  next();
};
