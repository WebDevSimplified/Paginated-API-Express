const jwt = require('jsonwebtoken');

// Capitalize
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Generate JWT access token
const generateToken = (user) => jwt.sign({ username: user.username,  role: user.role, iat: Date.now() }, process.env.SECRET_KEY);


module.exports = {
  capitalize,
  generateToken
};
