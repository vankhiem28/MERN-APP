import express from "express";
import bodyParser from "body-parser";
import db from "./src/config/db.js";
import dotenv from "dotenv";
import router from "./src/routers/index.js";

dotenv.config();

const app = express();

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
router(app);

app.listen(process.env.PORT || 5000, async () => {
  await db.connect();
  console.log("listening on port " + process.env.PORT);
});
