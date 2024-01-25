import express from "express";
import { register, login } from "../controllers/auth.js";
import cors from "cors"

const router = express.Router()

router.post('/register', register)
router.post('/login', cors(), login)
router.post('/logout', ()=>{})

export default router