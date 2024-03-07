// create token and saving that in cookies
const sendToken = (res, user) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    httpOnly: true,
    // sameSite: "none",
    sameSite: 'strict', // Prevent CSRF attacks
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  res.cookie("token", token, options)
};

module.exports = sendToken;
