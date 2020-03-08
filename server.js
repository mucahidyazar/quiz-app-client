const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("client/build"));

app.use("/", require("./routes/quizRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));

// Every other API or similar routes should be before this catch-all
if (process.env.NODE_ENV === "production") {
  app.use("/", require("./routes/quizRoute"));
  app.use("/users", require("./routes/userRoute"));
  app.use("/auth", require("./routes/authRoute"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// app.options("/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
//   );
//   res.sendStatus(200);
// });

// app.all("*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
//   );
//   next();
// });

app.listen(PORT, () => {
  console.log("Server is started on the port " + PORT);
});
