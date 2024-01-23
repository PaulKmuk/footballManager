import express from "express"
import { addEvent, getEvents, deleteEvent, updateEvent, getEvent, getEventsType } from "../controllers/events.js"


const router = express.Router()

router.get("/:id", getEvents) // id_user_event
router.get("/event/:id", getEvent)
router.get("/", getEventsType)
router.post("/addEvent", addEvent)
router.delete("/:id", deleteEvent)
router.put("/:id", updateEvent)


export default router