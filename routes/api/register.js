require("dotenv").config();
const User = require("../../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();

//@route POST /api/register
//@desc REGISTER USER
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      const newUser = new User({
        name,
        email,
        password,
      });
      //Hash password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      jwt.sign(
        { userId: newUser.id },
        process.env.JWTSECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "Register Success" });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
