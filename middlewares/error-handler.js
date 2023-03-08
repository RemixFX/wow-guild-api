const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err.message)
  res.status(statusCode).send(
    { message: message ? message : 'На сервере произошла ошибка' },
  );
  next();
};
module.exports = errorHandler;
