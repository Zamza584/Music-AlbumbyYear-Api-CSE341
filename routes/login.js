const path = require("path");

//display home page
const router = require("express").Router();

router.get("/", (req, res) => {
  /*#swagger.tags = ['Login']
    #swagger.summary = "Renders index.html" */
  res.render("index", {});
  // res.sendFile("index.html", { root: "./public" });
});

router.post("/", async (req, res) => {
  res.redirect("/albums");
});

router.get("/register", (req, res) => {
  /*#swagger.tags = ['Login']
    #swagger.summary = "Sends user to register page" */
  res.sendFile("registration.html", { root: "./public" });
});

module.exports = router;
