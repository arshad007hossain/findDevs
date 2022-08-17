const express = require("express");
const router = express.Router();


//@route get app/profile
//access public
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;