const unknownEndpoint = (req, res, next) => {
  res.status(404).send('this route leads to no where...');
};

const errorHandler = (err, req, res, next) => {
  console.log('custom error handler log--- ', err);
  next();
};

module.exports = { unknownEndpoint, errorHandler };
