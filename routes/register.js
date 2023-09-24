const router = require("express").Router();

router.get("/", (req, res) => {
  /*#swagger.tags = ['Login']
    #swagger.summary = "Sends user to register page" */

  res.render("registration", {});
});

module.exports = router;
