const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));

app.use(express.json({ extended: false }));

app.listen(PORT, () => console.log("Server started on port " + PORT));

app.get("/", (req, res) => res.send("Hello World"));

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

app.use("/", require("./routes/quizRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));
