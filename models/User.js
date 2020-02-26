const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date
  },
  checkbox: {
    type: Boolean
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  totalQuiz: {
    type: Number
  },
  totalCompleted: {
    type: Number
  },
  totalSolved: {
    type: Number
  },
  totalTrue: {
    type: Number
  },
  totalPass: {
    type: Number
  },
  totalFalse: {
    type: Number
  },
  totalPoint: {
    type: Number
  }
});

module.exports = mongoose.model("user", UserSchema);
