import express from "express";
import checkAPIs from "express-validator";
import filterAPIs from "express-validator";

const { body } = checkAPIs;
const { matchedData } = filterAPIs;

import { getPosts, getPost, createPost } from "../controllers/feed";

const router = express.Router();

// GET /feed/posts
router.get("/posts", getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    body("title")
      .trim()
      .isLength({ min: 7 }),
    body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  createPost
);

router.get("/post/:postId", getPost);

export default router;
