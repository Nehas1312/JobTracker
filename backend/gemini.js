import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
console.log(API_KEY)

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
);

const data = await res.json();
console.log(data);