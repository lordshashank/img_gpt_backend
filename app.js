const express = require("express");
const app = express();

const answer = require("./api/chatgpt");
// const sendData = require("./api/bu");
app.get("/", (req, res) => {
  res.json("Hello, World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "https://img-gpt.vercel.app");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  //   res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(answer);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is listening on port 3001");
});
