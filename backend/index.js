import express from "express"
import authRoutes from "./routes/auth.js"
import playersRoutes from "./routes/players.js"
import eventsRoutes from "./routes/events.js"
import attendRoutes from "./routes/attend.js"
import cors from "cors"
import multer from "multer"

const app = express()
app.use(cors())
app.use(express.json())

// --- Dodawanie zdjęcia na serwer --- 
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		return cb(null, "../frontend/public/upload")
	},
	filename: function(req, file, cb) {
		return cb(null, Date.now() + file.originalname)
	}
})

const upload = multer({ storage })

app.post("/upload", upload.single("imgPlayer"), (req, res) => {

	// console.log(req.file);
	res.status(200).json(req.file.filename)
})

// app.options('*', cors());

// --- Routes ---
app.use("/auth", authRoutes)
app.use("/players", playersRoutes)
app.use("/events", eventsRoutes)
app.use("/attend", attendRoutes)

app.get('/', (req, res) => {
	res.send('Server Working!')
})



app.listen(8800, () =>{
   console.log("Connected from server, port:8800");
})

