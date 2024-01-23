import { db } from "../db.js";


export const addAttend = (req, res) => {
   const q = "INSERT INTO trainingattendance (`id_event`, `id_player`, `attended`, `date`, `idu`) VALUES ?"
   // const elementsToAdd = [
   //    { id_event: 9, id_player: 3, attended: 1, date: "2024-01-20 17:00:00", idu: 2 },
   //    { id_event: 9, id_player: 2, attended: 1, date: "2024-01-20 17:00:00", idu: 2 },
   //    { id_event: 9, id_player: 16, attended: 1, date: "2024-01-20 17:00:00", idu: 2 },
   // ]
   const values = req.body.map(el => [el.id_event, el.id_player, el.attended, el.date, el.idu])

   db.query(q, [values], (err, data) => {
      if(err) return res.status(500).json(err)
      res.status(200).json("Array has been added successful")
   })
}

export const getAttendTrenning = (req, res) => {
   const q = "SELECT * FROM trainingattendance WHERE id_event=?"
   db.query(q, [req.params.id], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
   })
}
export const getAttendTrenningUser = (req, res) => {
   const q = "SELECT * FROM trainingattendance WHERE idu=?"
   db.query(q, [req.params.id], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json(data)
   })
}

export const deleteAttend = (req, res) => {
   const q = "DELETE FROM trainingattendance WHERE id_event=?"
   db.query(q, [req.params.id], (err, data) => {
      if(err) return res.status(500).json(err)
      return res.status(200).json("Attended has been deleted")
   })
}





