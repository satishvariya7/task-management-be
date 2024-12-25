const errorHandler = (error, req, res, next) => {
  if (error) {
    res.send({ isError: true, message: error.message });
  }
};

module.exports = errorHandler;
