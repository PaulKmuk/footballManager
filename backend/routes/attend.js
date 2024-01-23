import express from "express";
import { addAttend, getAttendTrenning, deleteAttend, getAttendTrenningUser } from "../controllers/attend.js";

const router = express.Router()

router.get("/:id", getAttendTrenning) // id from evetnt
router.get("/user/:id", getAttendTrenningUser) // id from idu (id user)
router.delete("/:id", deleteAttend) // id from event
router.post("/addAttend", addAttend)

export default router