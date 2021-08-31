const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../../middleware/auth");
const User = require("../../../modals/User");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const jwt = require("jsonwebtoken");
//@route Get api/profile
//@desc Test route
//@acess Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route Post api/auth
//@desc Authenticate user & get token
//@acess Public
// router.get("/", (req, res) => res.send("users route"));
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("am here 0");
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("am here 1");
    try {
      const awaitdUser = await User.findOne({ email });
      console.log("am here 2", awaitdUser);
      if (!awaitdUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
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
