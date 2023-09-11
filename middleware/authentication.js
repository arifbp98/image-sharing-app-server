const { User } = require("../models");
const { readToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];
    const token = readToken(accessToken);
    const user = await User.findOne({ where: { id: token.id } });
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
