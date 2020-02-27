const express = require("express");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const Quizes = require("../models/Quizes");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post(
  "/",
  [
    check("username", "Please add username")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    res.header(
      "Accept",
      "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { username, email, password, repassword } = req.body;
    if (password === repassword) {
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        }
        user = new User({
          username,
          email,
          password,
          totalQuiz: 0,
          totalCompleted: 0,
          totalSolved: 0,
          totalTrue: 0,
          totalPass: 0,
          totalFalse: 0,
          totalPoint: 0
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        res.status(500).send("Server Error");
      }
    } else {
      return res.status(400).json({ msg: "Passwords are not the same" });
    }
  }
);

router.put("/", auth, async (req, res) => {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );

  const { totalSolved, totalTrue, totalPass, totalFalse } = req.body;
  console.log(req.body);

  let totalQuiz;

  Quizes.countDocuments({ quizAuthor: req.user.id }, (err, count) => {
    if (err) throw err;
    totalQuiz = count;
  });

  User.findById(req.user.id, function(err, doc) {
    if (err) throw err;
    doc.totalCompleted = doc.totalCompleted + 1;
    totalSolved && (doc.totalSolved = doc.totalSolved + totalSolved);
    totalTrue && (doc.totalTrue = doc.totalTrue + totalTrue);
    totalPass && (doc.totalPass = doc.totalPass + totalPass);
    totalFalse && (doc.totalFalse = doc.totalFalse + totalFalse);
    totalTrue && (doc.totalPoint = doc.totalPoint + totalTrue * 10);

    //Calculating Total Quiz
    doc.totalQuiz = totalQuiz ? totalQuiz : 1;

    doc.save();
  });
});

router.put("/:id", auth, async function(req, res) {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    birthday,
    checkbox
  } = req.body;

  try {
    User.findById(req.user.id, async (err, user) => {
      username && username !== "" && (user.username = username);
      firstName && firstName !== "" && (user.firstName = firstName);
      lastName && lastName !== "" && (user.lastName = lastName);
      email && email !== "" && (user.email = email);
      birthday && (user.birthday = birthday);
      checkbox === true ? (user.checkbox = true) : (user.checkbox = false);

      if (password && password !== "") {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      user.save();
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/image", auth, async (req, res) => {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );
  User.findById(req.user.id, (err, user) => {
    user.profilePhoto = req.body;
    user.save();
  });
});

module.exports = router;
