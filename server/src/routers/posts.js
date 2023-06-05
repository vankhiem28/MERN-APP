import express from "express";
import PostController from "../controllers/Post.js";

const router = express.Router();

router.post("/create", PostController.create);
router.put("/update/:id", PostController.update);
router.delete("/delete/:id", PostController.delete);
router.get("/", PostController.show);

export default router;
