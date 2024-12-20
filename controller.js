const userSchema = require("./modal/user");

class Controller {
  createUser = async (req, res) => {
    try {
      const { name, email, designation, phoneNumber, city, state, postalCode } =
        req.body;
      const emailExist = await userSchema.findOne({ email: email });
      if (emailExist) {
        return res.status(400).send("Email Already Exists");
      }
      let user = new userSchema({
        name,
        email,
        designation,
        phoneNumber,
        city,
        state,
        postalCode,
      });
      await user.save();
      res.status(200).send("User added successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  getUser = async (req, res) => {
    try {
      const usersData = await userSchema.find();
      res.status(200).send(usersData);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  updateUser = async (req, res) => {
    try {
      const { name, email, designation, phoneNumber, city, state, postalCode } =
        req.body;
      const emailExist = await userSchema.findOne({ email });
      if (!emailExist) {
        return res.status(400).send("User does not exist");
      }

      await userSchema.findByIdAndUpdate(req.params.id, req.body);
      const user = await userSchema.findOne({ email });
      res.status(200).send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  deleteUser = async (req, res) => {
    try {
      await userSchema.findByIdAndDelete(req.params.id);
      const users = await userSchema.find();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = new Controller();
