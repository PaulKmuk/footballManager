import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";


export const register = (req, res) => {
    // Sprawdzanie czy istnieje użytkownik o pdanych danych  
    const q = "SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if(err) return res.json(err)
        // w odpowiedzi otrzymamy tablice z uzytkownikami którzy mają takie dane jak podane w req, 
        // jeśli długość tablicy istnieje to oznacza że już taki istnieje więc wysyłamy błąd i nie rejestrujemy 
        if(data.length) return res.status(409).json("User already exist")

        // Hashowanie hasła
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        // utworzenie użytkownika w tabeli 
        const q = `INSERT INTO users (username, password, email) VALUES (?)`
        const values = [
            req.body.username,
            hash,
            req.body.email,
        ]
        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
            return res.status(200).json("User has been created")
        })
    })
}

export const login = (req, res) => {

    // sprawdzamy czy istnieje taki uzytkownik
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.status(500).json("err")
        if(data.length === 0) return res.status(404).json("User not found") 

        
        //sprawdzamy poprawność hasła
        const isPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPassword) return res.status(400).json("Wrong username or password")
        
        const token = jwt.sign({ id: data[0].id }, "jwtkey")

        // destrukturyzacja obiektu i wyciągnięcie z niego hasła
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true,
            expiresIn: '1h',
        }).status(200).json(other)
    })
}