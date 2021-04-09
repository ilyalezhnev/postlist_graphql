const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCurrentUserId = (token) => {
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      return userId;
    } catch (err) {
      throw new Error("Session invalid");
    }
  }

  return null;
};

module.exports = {
  getCurrentUserId,
};
