const sendToken = (res, user) => {
  // Generate JWT token
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    httpOnly: true,
    secure: true, // Send only over HTTPS
    sameSite: "none", // Suitable for cross-origin requests
  };

  // Set the token in the cookie
  res.cookie("token", token, options);
};

module.exports = sendToken;
