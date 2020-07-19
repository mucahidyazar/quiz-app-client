const express = require("express");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const Quizes = require("../models/Quizes");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, email, password, repassword } = req.body;

  if (password === repassword) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ message: "User already exists" });
      }
      user = new User({
        username,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).send({ message: "Passwords are not the same" });
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const id = req.user.id;

    const { totalSolved, totalTrue, totalPass, totalFalse } = req.body;
    const quizes = await Quizes.countDocuments({ quizAuthor: id });

    if (!quizes) {
      res.status(404).send();
    }

    const user = await User.findByIdAndUpdate(id, (error, user) => {
      if (error) {
        res.status(500).send(error);
      }
      user.totalCompleted = user.totalCompleted + 1;
      totalSolved && (user.totalSolved = user.totalSolved + totalSolved);
      totalTrue && (user.totalTrue = user.totalTrue + totalTrue);
      totalPass && (user.totalPass = user.totalPass + totalPass);
      totalFalse && (user.totalFalse = user.totalFalse + totalFalse);
      totalTrue && (user.totalPoint = user.totalPoint + totalTrue * 10);
      user.totalQuiz = totalQuiz ? totalQuiz : 1;
      user.save();
    });

    if (!user) {
      res.status(404).send();
    }
  }
});

router.patch("/:id", auth, async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    birthday,
    checkbox,
  } = req.body;

  if (!password.trim().length) {
    res.status(400).send();
  }

  try {
    const id = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const user = User.findByIdAndUpdate(
      id,
      {
        username,
        firstName,
        lastName,
        email,
        password: bcrypt.hash(password, salt),
        birthday,
        checkbox,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/image", auth, async (req, res) => {
  const user = User.findById(req.user.id, async (error, user) => {
    if (error) {
      res.status(500).send();
    }
    if (user.profilePhoto) {
      fs.unlink(
        path.join(
          __dirname,
          `../client/public/img/${user.profilePhoto.filename}`
        ),
        (error) => {
          console.error(error);
        }
      );
      res.send("Old profile image was deleted");
    }
    user.profilePhoto = req.body;
    const userData = await user.save();
    res.send(userData);
  });
});

module.exports = router;
