import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (user) => {
        // const res = await axios.post("http://localhost:8800/auth/login", user)
        const res = await axios.post("/auth/login", user)
        console.log(res);
        setCurrentUser(res.data)
    }

    const register = async (newUser) => {
        // await axios.post("http://localhost:8800/auth/login", newUser)
        await axios.post("https://api.render.com/deploy/srv-cmp15beg1b2c73f7vd30?key=Qxg5K-8sMFo/auth/login", newUser)
    }

    const logout = () => {
        setCurrentUser(null)
        localStorage.setItem("user", null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}