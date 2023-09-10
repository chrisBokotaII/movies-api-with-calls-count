const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const { sequelize } = require("./models");
const movies = require("./routes/movies");
const user = require("./routes/user");

dotenv.config();
const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/api-v1/", movies);
app.use("/api-v1/", user);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
