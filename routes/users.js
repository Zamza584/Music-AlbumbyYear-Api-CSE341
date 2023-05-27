const router = require("express").Router();
const UserSchema = require("../models/userSchema");

//get all users
router.get("/", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const allContacts = await UserSchema.find();
    res.json(allContacts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create user for application
router.post("/", async (req, res) => {
  // #swagger.tags = ['Users']
  const users = UserSchema(req.body);
  try {
    const data = await users.save();
    res.status(201).json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific user to update info
router.get("/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  const { id } = req.params;
  const response = await UserSchema.findById(id);
  res.send("Welcome User " + response.firstName);
});

module.exports = router;
