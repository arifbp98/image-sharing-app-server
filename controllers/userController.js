const { User, Image } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = hashPassword(password, 8);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: `New user with id ${newUser.id} created.` });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "WrongEmail" };
      }
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        throw { name: "WrongPassword" };
      }
      const payload = { id: user.id, name: user.name };
      const token = generateToken(payload);

      res.status(200).json({ email, accessToken: token });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: {
          model: Image,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
      });

      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: {
          model: Image,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
      });
      if (!user) {
        throw { name: "DataNotFound" };
      }

      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const hashedPassword = hashPassword(password, 8);

      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "DataNotFound" };
      }
      User.update({ name, email, password: hashedPassword }, { where: { id } });

      res.status(200).json({ message: `User with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "DataNotFound" };
      }
      User.destroy({ where: { id } });

      res.status(200).json({ message: `User with id ${id} deleted` });
    } catch (error) {
      next(error);
    }
  },
};
