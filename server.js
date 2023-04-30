import express from "express";
import db from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res, next) => {
  res.json("Home");
});

app.listen(process.env.PORT || 5000, async () => {
  await db.connect();
  console.log("listening on port " + process.env.PORT);
});
