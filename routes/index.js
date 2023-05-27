//display home page
const router = require("express").Router();

router.get("/", (req, res) => { 
    res.send("Main web page")
    
})

module.exports = router;


