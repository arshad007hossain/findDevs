const express = require("express");
const router = express.Router();

//@route get app/users
//access public
router.get("/", (req, res) => res.send("user route"));

module.exports = router;
