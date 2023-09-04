const errorMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Непредвиденная ошибка' : message,
  });

  next();
};

export default errorMiddleware;
