const express = require("express");
const router = express.Router();
const users = require("./users");
const images = require("./images");
const { register, login } = require("../controllers/userController");

router.post("/api/register", register);
router.post("/api/login", login);
router.use("/api/users", users);
router.use("/api/images", images);

module.exports = router;
