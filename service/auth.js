const jwt = require("jsonwebtoken");
const seceret = "vikasTrip";

function setUser(user) {
  return jwt.sign(
    {
      _id: user.id,
      email: user.email,
      role: user.role,
    },
    seceret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, seceret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
