import express from 'express'
import { getUsers, loginUser } from '../controllers/Authorization.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/login", loginUser)

export default router

