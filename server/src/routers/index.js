import userRouter from "./users.js";
import postRouter from "./posts.js";

const router = (app) => {
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
};

export default router;
