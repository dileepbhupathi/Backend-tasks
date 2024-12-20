require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
// const userSchema = require("./modal/user");
const mongoose = require("mongoose");
const router = require("./router");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database running!!!"))
  .catch((err) => console.log(err, "Something went wrong"));

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello Dileep");
});
app.use(function (req, res) {
  res.status(404).json({
    error: `URL ${req.url} with method ${req.method} is not exist`,
  });
});
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: err.message || "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error.message || error);
  // process.exit(1);
});
