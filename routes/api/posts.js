const express = require("express");
const router = express.Router();


//@route get app/posts
//access public
router.get("/", (req, res) => res.send("Post route"));

module.exports = router;