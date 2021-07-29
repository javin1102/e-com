require("dotenv").config();
const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

//@route GET api/auth
//@desc Authentication ROUTE (check if token still valid and get user data)
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route POST api/auth
//@desc LOGIN ROUTE
router.post(
  "/",
  [
    check("email", "Invalid email address").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //Find user by email
      const user = await User.findOne({ email });

      //if email is not exists, show error
      if (!user) {
        return res.status(400).json({ msg: "Email does not exist!" });
      }
      //user is exists, compare Password
      const isMatch = await bcrypt.compare(password, user.password);

      //if not match, show error "password not match"
      if (!isMatch) {
        return res.status(400).json({ msg: "Password not match" });
      }

      //password is match, give token to user
      jwt.sign(
        { userId: user.id },
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
