const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
