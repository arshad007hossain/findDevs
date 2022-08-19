const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authmiddleware");
const User = require("../../models/User");

//@route get app/auth
//access public
router.get("/", auth,async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.messge)
        res.status(500).send('Server Error')
    }
});

module.exports = router;
