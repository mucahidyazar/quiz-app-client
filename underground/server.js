import express from "express";
require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/quizes", require("./routes/quizRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));

app.listen(PORT, () => {
  console.log("Server is started on the port " + PORT);
});
