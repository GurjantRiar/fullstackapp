const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const User = require("../../../modals/User");
const jwt = require("jsonwebtoken");

console.log("/users here ");

//@route Post api/users
//@desc Register route
//@acess Public
// router.get("/", (req, res) => res.send("users route"));
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
    console.log("am here 0");
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    console.log("am here 1");
    try {
      const awaitdUser = await User.findOne({ email });
      console.log("am here 2", awaitdUser);
      if (awaitdUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log("before user.save");
      await user.save();
      console.log("after user.save");
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get("jwtSecret"));
      {
        expiresIn: 360000;
      }
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      };
      // console.log("before jwt send ", jwt);
      // res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
