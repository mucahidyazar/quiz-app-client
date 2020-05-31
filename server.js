import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import cors from "cors";
import connectDB from "./config/db";
import { typeDefs, Query, Mutation } from "./graphql";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("client/build"));

app.use("/", require("./routes/quizRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));

const startServer = () => {
  connectDB();

  // Every other API or similar routes should be before this catch-all
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
  });

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log("Server is started on the port " + PORT);
  });
};
startServer();
