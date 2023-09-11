const { Image, User } = require("../models");
const cloudinaryConfig = require("../config/cloudinary");

module.exports = {
  createImage: async (req, res, next) => {
    try {
      const { img, title, userId } = req.body;
      const uploadedImage = await cloudinaryConfig.uploader.upload(img);

      const data = await Image.create({
        img: uploadedImage.secure_url,
        title,
        userId,
      });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  },

  getAllImages: async (req, res, next) => {
    try {
      const images = await Image.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json({ data: images });
    } catch (error) {
      next(error);
    }
  },

  getImageById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const image = await Image.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: { model: User },
      });
      if (!image) {
        throw { name: "DataNotFound" };
      }

      res.status(200).json({ data: image });
    } catch (error) {
      next(error);
    }
  },

  updateImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { img, title } = req.body;
      const uploadedImage = await cloudinaryConfig.uploader.upload(img);

      const image = await Image.findByPk(id);
      if (!image) {
        throw { name: "DataNotFound" };
      }
      Image.update({ img: uploadedImage.secure_url, title }, { where: { id } });

      res.status(200).json({ message: `Data with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const image = await Image.findByPk(id);
      if (!image) {
        throw { name: "DataNotFound" };
      }
      Image.destroy({ where: { id } });

      res.status(200).json({ message: `Data with id ${id} deleted` });
    } catch (error) {
      next(error);
    }
  },
};
