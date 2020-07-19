const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  profilePhoto: {
    type: Object,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  checkbox: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  totalQuiz: {
    type: Number,
    default: 0,
  },
  totalCompleted: {
    type: Number,
    default: 0,
  },
  totalSolved: {
    type: Number,
    default: 0,
  },
  totalTrue: {
    type: Number,
    default: 0,
  },
  totalPass: {
    type: Number,
    default: 0,
  },
  totalFalse: {
    type: Number,
    default: 0,
  },
  totalPoint: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", UserSchema);
