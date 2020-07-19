const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  imageInformation: {
    type: Object
  },
  quizTitle: {
    type: String,
    required: true
  },
  quizDescription: {
    type: String,
    required: true
  },
  quizCategory: {
    type: String,
    required: true
  },
  quizType: {
    type: String,
    required: true
  },
  quizDifficulty: {
    type: String,
    required: true
  },
  quizQuestions: {
    type: Array,
    required: true
  },
  quizDate: {
    type: Date
  },
  quizAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  quizScoreboard: {
    type: Array
  }
});

module.exports = mongoose.model("quize", QuizSchema);
