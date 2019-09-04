import express from "express";
import checkAPIs from "express-validator";
import isAuth from "../middleware/is-auth";

const { body } = checkAPIs;

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from "../controllers/feed";

const router = express.Router();

// GET /feed/posts
router.get("/posts", isAuth, getPosts);

// POST /feed/post
router.post(
  "/post",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  createPost
);

router.get("/post/:postId", isAuth, getPost);

router.put(
  "/post/:postId",
  isAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  updatePost
);

router.delete("/post/:postId", isAuth, deletePost);

export default router;
