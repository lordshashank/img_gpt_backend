const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;
// app.use(express.json());
const router = express.Router();

router.post("/answer", async (req, res, next) => {
  const { prompt } = req.body;
  console.log(prompt);

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: req.body.text,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.5,
      // max_tokens: 7,
      model: "text-davinci-003",
    },
    {
      headers: {
        Authorization: `Bearer ${CHATGPT_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const generatedText = response.data.choices[0].text;
  //   console.log("ye hai");
  //   console.log(generatedText);
  res.send({ generatedText });
});

module.exports = router;
