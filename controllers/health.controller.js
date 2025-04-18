module.exports = {
  healthCheck: (req, res, next) => {
    try {
      res.status(200).send("OK");
    } catch (error) {
      next(error);
    }
  },
};
