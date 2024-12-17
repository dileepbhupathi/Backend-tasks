const express = require("express");
const app = express();
const userSchema = require("./modal/user");
const mongoose = require("mongoose");

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://dileepbhupathi97:Dileep97@cluster0.znmqgls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("Database running!!!"))
  .catch((err) => console.log(err, "Something went wrong"));

app.get("/", (req, res) => {
  res.send("Hello Dileep");
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const emailExist = await userSchema.findOne({ email: email });
    if (emailExist) {
      return res.status(400).send("Email Already Exists");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Incorrect Password");
    }
    let user = new userSchema({
      username,
      email,
      password,
      confirmPassword,
    });
    await user.save();
    res.status(200).send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/users", async (req, res) => {
  try {
    const usersData = await userSchema.find();
    res.status(200).send(usersData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});
app.put("/editUser/:id", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const emailExist = await userSchema.findOne({ email });
    if (!emailExist) {
      return res.status(400).send("User does not exist");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }

    emailExist.password = password;
    emailExist.confirmPassword = confirmPassword;

    const updateUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      emailExist,
    );
    res.status(200).send(emailExist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    const users = await userSchema.find();
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server Running!!!");
});
