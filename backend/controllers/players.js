import { db } from "../db.js";

export const getPlayers = (req, res) => {

    const q = "SELECT * FROM players WHERE id_user=?"
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}

export const getPlayer = (req, res) => {

    const q = "SELECT * FROM players WHERE id=? AND id_user=?"
    db.query(q, [req.params.id, req.query.id_user], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addPlayer = (req, res) => {

    const q = "INSERT INTO players (`id_user`, `name`, `lastname`, `dateOfBirth`, `position`) VALUES (?)"
    const values = [
        req.body.id_user,
        req.body.name,
        req.body.lastname,
        req.body.dateOfBirth,
        req.body.position,
    ]
    db.query(q, [values], (err, data) => {
        err && res.json(err)
        return res.status(200).json("Player has been created")
    })

}

export const deletePlayer = (req, res) => {

    const q = "DELETE FROM players WHERE id=? AND id_user=?"
    db.query(q, [req.params.id, req.query.id_user], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json("Player has been deleted")
    })
}

export const updatePlayer = (req, res) => {

    const q = "UPDATE players SET `id_user` = ?, `name` = ?, `lastname` = ?, `dateOfBirth` = ?, `position` = ?, `imgPlayer` = ? WHERE `id` = ? AND `id_user` = ?"

    const values = [
        req.body.id_user,
        req.body.name,
        req.body.lastname,
        req.body.dateOfBirth,
        req.body.position,
        req.body.imgPlayer
    ]

    db.query(q, [...values, req.params.id, req.query.id_user], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json("Player has been update")
    })
}