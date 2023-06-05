import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv";
import router from "./routers/index.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

// use middleware
app.use(cors());
app.use(auth);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
router(app);

app.listen(process.env.PORT || 5000, async () => {
  await db.connect();
  console.log("listening on port " + process.env.PORT);
});
