const path = require("path");

//display home page
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

router.get("/register", (req, res) => {
  res.sendFile("registration.html", { root: "./public" });
});
module.exports = router;
