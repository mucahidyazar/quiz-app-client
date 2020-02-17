const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quizes");

router.get("/quizes", async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.json(quizes);
  } catch (err) {
    console.error(err);
  }
});

router.post("/quiz/add-quiz", async (req, res) => {
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
      quizDate: Date.now()
    });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
