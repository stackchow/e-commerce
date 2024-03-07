// create token and saving that in cookies
const sendToken = (res, user) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: "none",
    sameSite: 'strict', // Prevent CSRF attacks
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  res.cookie("token", token, options)
};

module.exports = sendToken;
