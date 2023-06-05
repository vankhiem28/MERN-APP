import express from "express";
import UserController from "../controllers/User.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get("/auth", UserController.auth);
router.get("/", UserController.show);

export default router;
