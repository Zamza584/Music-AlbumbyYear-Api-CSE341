const router = require("express").Router();
const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  /*#swagger.tags = ['Login']
    #swagger.summary = "Renders index.html" */
  res.render("login", {});
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  const user = await UserSchema.findOne({ email: new RegExp("^" + email + "$", "i") });

  if (user == null) {
    res.render("login", { message: "Error no user found, please try again." });
  } else {
    const newUser = { id: user.id, email: user.email };
    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.cookie("token", accessToken, {
        httpOnly: true
      });

      res.redirect("/");
    } else {
      res.render("login", { message: "Error no user found, please try again." });
    }
  }
});

module.exports = router;
