const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
// const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
const PALM_API_KEY = process.env.PALM_API_KEY;
// app.use(express.json());
const router = express.Router();

router.post("/answer", async (req, res, next) => {
  const prompt = req.body.text;

  const requestBody = {
    prompt: {
      text: prompt,
    },
    temperature: 1.0,
    candidate_count: 1,
    maxOutputTokens: 1000,
  };

  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=" +
      PALM_API_KEY,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("ye hai");
  const generatedText = response.data.candidates[0].output;

  res.send({ generatedText });
});

module.exports = router;
