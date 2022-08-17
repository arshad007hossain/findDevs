const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//@route get app/users
//access public
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name is missing"),
    body("email").isEmail().withMessage("Email is missing"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 6 character"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("user routes is working");
  }
);

module.exports = router;
