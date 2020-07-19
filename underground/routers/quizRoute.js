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
    if (!quizes) {
      res.status(404).send();
    }
    res.json(quizes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/quiz/add-quiz", auth, async (req, res) => {
  try {
    const quiz = new Quiz({
      ...req.body,
      quizDate: Date.now(),
      quizAuthor: req.user.id,
      quizScoreboard: [],
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/quiz/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delteQuiz = await Quiz.findByIdAndDelete(id);
    res.json(delteQuiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/quiz/delete-image", auth, async (req, res) => {
  try {
    if (req.body.filename) {
      fs.unlink(
        path.join(__dirname, `../client/public/img/${req.body.filename}`),
        (err) => {
          console.error(err);
        }
      );
      res.send({ message: "Old quiz cover image was deleted" });
    }
  } catch (error) {
    res.status(500).error(error);
  }
});

router.patch("/quiz/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.user.id;
    const { username } = await User.findById(userID);

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        username,
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!quiz) {
      res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/quizes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.send(error);
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
