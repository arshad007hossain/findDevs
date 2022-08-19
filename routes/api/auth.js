const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const auth = require("../../middleware/authmiddleware");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult, check } = require("express-validator");

//@route get api/auth
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


//@route post app/users
//access public
router.post(
    "/",
    [
      check("email","please give a valid email").isEmail(),
      check("email","password is required").exists(),  
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }
  );

module.exports = router;
