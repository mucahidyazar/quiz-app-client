const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Quiz = require("../models/Quizes");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/quizes", async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.json(quizes);
  } catch (err) {
    console.error(err);
  }
});

router.post("/quiz/add-quiz", auth, async (req, res) => {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );
  try {
    const {
      imageInformation,
      quizTitle,
      quizDescription,
      quizCategory,
      quizType,
      quizDifficulty,
      quizQuestions,
    } = req.body;

    const quiz = new Quiz({
      imageInformation,
      quizTitle,
      quizDescription,
      quizCategory,
      quizType,
      quizDifficulty,
      quizQuestions,
      quizDate: Date.now(),
      quizAuthor: req.user.id,
      quizScoreboard: [],
    });
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/quiz/:id", async (req, res) => {
  try {
    const delteQuiz = await Quiz.findByIdAndDelete(req.params.id);
    console.log(delteQuiz.data);
    res.json(delteQuiz.data);
  } catch (err) {
    console.log("Hata");
    console.error(err);
  }
});

router.put("/quiz/delete-image", auth, async (req, res) => {
  if (req.body.filename) {
    fs.unlink(
      path.join(__dirname, `../client/public/img/${req.body.filename}`),
      (err) => {
        console.error(err);
      }
    );
    console.log("Old quiz cover image was deleted");
  }
});

router.put("/quiz/:id", auth, async (req, res) => {
  res.header(
    "Accept",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
  );
  const { totalTrue, totalPass, totalFalse, totalPoint } = req.body;
  const userID = req.user.id;
  const { username } = await User.findById(userID);

  Quiz.findById(req.params.id, (err, quiz) => {
    quiz.quizScoreboard.push({
      username,
      totalTrue,
      totalPass,
      totalFalse,
      totalPoint,
    });

    quiz.save();
  });
});

router.get("/quizes/:id", async (req, res) => {
  try {
    const quizes = await Quiz.find({ quizAuthor: req.params.id });
    res.header("Access-Control-Allow-Origin", "*");
    res.json(quizes);
  } catch (err) {
    console.error(err);
  }
});

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "client/public/img");
  },
  filename: (req, file, callback) => {
    let filename = "image"; //Original isimi file.originalname ile alabilirsiniz
    let extension = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
    };
    callback(null, filename + "-" + Date.now() + extension[file.mimetype]);
  },
});
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024, //1MB
  },
}).single("file");
router.post("/upload-image", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(req.file);
  });
});

module.exports = router;
