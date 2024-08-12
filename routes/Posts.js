import express from 'express'
import { getPosts, getMyPost } from '../controllers/Posts.js'

const router = express.Router();

router.get("/", getPosts);
router.get("/myposts/:userID", getMyPost);

export default router;