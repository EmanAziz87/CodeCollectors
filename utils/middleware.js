const unknownEndpoint = (req, res, next) => {
  res.status(404).send('this route leads to no where...');
};

const errorHandler = (error, req, res, next) => {
  console.log('custom error handler log--- ', error);

  if (
    error.errors[0]?.message ===
    `Validation len on ${error.errors[0]?.path} failed`
  ) {
    return res.status(400).send({
      error: error.name,
      message: `the length on "${error.errors[0]?.path}" attribute failed validation`,
      sqlLiteral: error.sql,
    });
  }

  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
