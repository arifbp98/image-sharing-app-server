const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
