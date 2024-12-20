const express = require("express");
const router = express.Router();
const controllers = require("./controller");

router.post("/user", controllers.createUser);
router.get("/users", controllers.getUser);
router.put("/user/:id", controllers.updateUser);
router.delete("/user/:id", controllers.deleteUser);

module.exports = router;
