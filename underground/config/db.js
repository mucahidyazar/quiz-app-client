require("dotenv").config();
const mongoose = require("mongoose");

const dbAdress = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/travia-quiz-app?retryWrites=true&w=majority`;
await mongoose.connect(dbAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
