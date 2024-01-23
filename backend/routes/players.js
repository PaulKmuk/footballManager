import express from "express";
import { addPlayer, getPlayers, deletePlayer, updatePlayer, getPlayer } from "../controllers/players.js";

const router = express.Router()

router.get("/:id", getPlayers)
router.get("/player/:id", getPlayer)
router.post("/addPlayer", addPlayer)
router.delete("/:id", deletePlayer)
router.put("/:id", updatePlayer)

export default router