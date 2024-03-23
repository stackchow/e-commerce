const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  res.status(statusCode).send({
    success: true,
    status: statusCode,
    user,
    token,
  });
};

module.exports = sendToken;