const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello Worlde"));

// // Quizleri cekebilmek icin izin verdik CORS'a
// app.options("/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   res.sendStatus(200);
// });

// app.all("*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

//Defining Routes
app.use("/auth", require("./routes/authRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/", require("./routes/quizRoute"));

app.listen(PORT, () => {
  console.log("Server is started on the port " + PORT);
});
