const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quizes");
const User = require("../models/User");
const auth = require("../middleware/auth");

const mongoose = require("mongoose");

router.get("/quizes", async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(quizes);
  } catch (err) {
    console.error(err);
  }
});

router.post("/quiz/add-quiz", auth, async (req, res) => {
  try {
    const {
      quizTitle,
      quizDescription,
      quizCategory,
      quizType,
      quizDifficulty,
      quizQuestions
    } = req.body;

    const quiz = new Quiz({
      quizTitle,
      quizDescription,
      quizCategory,
      quizType,
      quizDifficulty,
      quizQuestions,
      quizDate: Date.now(),
      quizAuthor: req.user.id,
      quizScoreboard: []
    });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.send(err);
  }
});

router.put("/quiz/:id", auth, async (req, res) => {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );
  const score = req.body;
  const userID = req.user.id;
  const user = await User.findById(userID);

  console.log(req.params.id);
  console.log(req.body);
  console.log(user);
  Quiz.findById(req.params.id, (err, quiz) => {
    quiz.quizScoreboard.push([score, user]);
    quiz.save();
  });
});

module.exports = router;
