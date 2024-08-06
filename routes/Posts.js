import express from 'express'
import { getPosts } from '../controllers/Posts.js'

const router = express.Router();

router.get("/", getPosts);

export default router;