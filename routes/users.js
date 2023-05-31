const router = require("express").Router();
const UserSchema = require("../models/userSchema");
const { userValidationRules, validate } = require("../utils/validator");
//get all users

router.get("/", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "Get all users"

  try {
    const allContacts = await UserSchema.find();
    res.json(allContacts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create user for application
router.post("/", userValidationRules(), validate, async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "create a User"
  /*	#swagger.requestBody = {
          description: "Data needed to create a contact",
          required: true,
          schema: { $ref: "#/definitions/users" }
    } */
  const users = UserSchema(req.body);
  console.log(req.body);
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
  // #swagger.summary = "search by id"
  /* #swagger.parameters['id'] = {
        description: "Insert user id here to get data",
        type: "String"
     } 
  */
  const { id } = req.params;
  const response = await UserSchema.findById(id);
  res.send("Welcome User " + response.firstName);
});

router.put("/:id", userValidationRules(), validate, async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "Update a User"
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: "Id of the User"
    }
  */
  /* #swagger.requestBody = {
       description: "Data needed to update a User",
       required: true,
       schema: { $ref: "#/definitions/updateUsers" }
    } 
  */
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await UserSchema.updateOne({ _id: id }, { $set: body });
    res.send("user has been updated!");
  } catch (err) {
    res.status(204).json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "delete a User"
  const { id } = req.params;
  try {
    const data = await UserSchema.deleteOne({ _id: id });
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
