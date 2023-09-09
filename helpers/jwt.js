require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function generateToken(payload) {
  return jwt.sign(payload, secretKey);
}

function readToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, readToken };
