const errorHandler = (error, req, res, next) => {
  console.log(error, "--");
  switch (error.name) {
    case "WrongEmail":
      res.status(401).json({ message: "Invalid email" });
      break;
    case "WrongPassword":
      res.status(401).json({ message: "Invalid password" });
      break;
    case "DataNotFound":
      res.status(404).json({ message: "Data not found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
