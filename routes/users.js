const router = require("express").Router();
const UserSchema = require("../models/userSchema");
const { userValidationRules, validate } = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cookieJWTAuth } = require("../public/middlewares/cookieJWTAuth");

router.post("/", userValidationRules(), validate, async (req, res) => {
  //used to register a new user

  /*#swagger.tags = ['Users']
      #swagger.summary = "create a User"
      #swagger.requestBody = {
            description: "Data needed to create a contact",
            required: true,
            schema: { $ref: "#/definitions/users" }
          } */

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const users = UserSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    });

    const data = await users.save();
    res.render("index", { message: "Congrats your account has been created" });
    // res.redirect("/");
    // res.status(201).json(data);
  } catch (err) {
    res.render("registration", { message: "error please try again" });
  }
});

router.post("/login", async (req, res) => {
  /*#swagger.tags = ['Users']
    #swagger.summary = "Validates and login user" */
  const email = req.body.email;
  const user = await UserSchema.findOne({ email: new RegExp("^" + email + "$", "i") });
  if (user == null) {
    res.status(400).send("no user found");
  }

  const newUser = { id: user.id, email: user.email };
  const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.cookie("token", accessToken, {
        httpOnly: true
      });

      res.redirect("/albums");
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/", async (req, res) => {
  /*#swagger.tags = ['Users']
    #swagger.summary = "Get all users" */
  try {
    const allContacts = await UserSchema.find();
    res.json(allContacts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", cookieJWTAuth, async (req, res) => {
  /*#swagger.tags = ['Users']
     #swagger.summary = "search by id"
     #swagger.parameters['id'] = {
        description: "Insert user id here to get data",
        type: "String"
     } 
  */
  const { id } = req.params;
  const response = await UserSchema.findById(id);
  res.send("Welcome User " + response.firstName);
});

router.put("/:id", cookieJWTAuth, validate, async (req, res) => {
  /* #swagger.tags = ['Users']
     #swagger.summary = "Update a User"
     #swagger.parameters['id'] = {
        in: 'path',
        description: "Id of the User"
    }
  
     #swagger.requestBody = {
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
    res.status(400).json({ message: err });
  }
});

router.delete("/:id", cookieJWTAuth, async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = "delete a User"
  const { id } = req.params;
  try {
    const data = await UserSchema.deleteOne({ _id: id });
    res.status(200).json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
