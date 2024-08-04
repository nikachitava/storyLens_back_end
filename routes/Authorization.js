import express from 'express'
import { getUsers, loginUser, registerUser, logout } from '../controllers/Authorization.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logout)

export default router

