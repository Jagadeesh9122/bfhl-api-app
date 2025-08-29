// index.js
import express from "express";

const app = express();
app.use(express.json());

// Replace with your details
const FULL_NAME = "baddila_jagadeesh";
const DOB = "23_9_2004"; // change ddmmyyyy
const EMAIL = "baddila.jagadeesh2022@vitstudent.ac,in";
const ROLL_NUMBER = "22BEC0912";

function isNumber(str) {
  return !isNaN(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;
    if (!Array.isArray(inputArray)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaConcat = "";

    inputArray.forEach((item) => {
      if (isNumber(item)) {
        let num = parseInt(item, 10);
        if (!isNaN(num)) {
          if (num % 2 === 0) even_numbers.push(item.toString());
          else odd_numbers.push(item.toString());
          sum += num;
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    // Alternating caps in reverse
    let concat_string = alphaConcat
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
