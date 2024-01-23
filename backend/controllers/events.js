import { db } from "../db.js";

export const addEvent = (req, res) => {

	const q = "INSERT INTO events (`id_user_event`, `type`, `date`, `place`, `desc`, `rival`) VALUES (?)"
	const values = [
		req.body.id_user_event,
		req.body.type,
		req.body.date,
		req.body.place,
		req.body.desc,
		req.body.rival,
	]
	db.query(q, [values], (err, data) => {
		if (err) return res.send(err)
		return res.status(200).json("Event has been created")
	})
}

export const getEvents = (req, res) => {

	const q = "SELECT * FROM events WHERE id_user_event = ?"
	db.query(q, [req.params.id], (err, data) => {
		if(err) return res.status(500).json(err)
		res.status(200).json(data)
	})
}

export const getEventsType = (req, res) => {

	const q = "SELECT * FROM events WHERE type=? AND id_user_event=?"
	db.query(q, [req.query.type, req.query.id_user_event], (err, data) => {
		if(err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}

export const getEvent = (req, res) => {

	const q = "SELECT * FROM events WHERE id=? AND id_user_event=?"
	db.query(q, [req.params.id, req.query.id_user_event], (err, data) => {
		if(err) return res.status(500).json(err)
		return res.status(200).json(data[0])
	})
}

export const deleteEvent = (req, res) => {

	const q = "DELETE FROM events WHERE id=? AND id_user_event=?"
	db.query(q, [req.params.id, req.query.id_user_event], (err , data) => {
		if(err) return res.status(500).json(err)
		res.status(200).json("Event has been deleted")
	})
}

export const updateEvent = (req, res) => {

	const q = "UPDATE events SET `type`=?, `date`=?, `place`=?, `desc`=?, `rival`=? WHERE `id`=? AND id_user_event=?"

	const value = [req.body.type, req.body.date, req.body.place, req.body.desc, req.body.rival]

	db.query(q, [...value, req.params.id, req.query.id_user_event], (err, data) => {
		if(err) return res.status(500).json(err)
		res.status(200).json("Event has been updated.")
	})
}