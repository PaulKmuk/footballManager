import { Routes, Route } from "react-router-dom"
import { Home, Login, Register } from "./pages/index"
import { useState, useContext } from "react"
import { AuthContext } from "./context/authContext"

function App() {

   const [userLogin, setUserLogin] = useState(true)
   const { currentUser } = useContext(AuthContext)

   return (
      <div>
         <Routes>
            <Route path="/login" element={currentUser ? <Home /> : <Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/*" element={currentUser ? <Home /> : <Login />}/>
         </Routes>
      </div>
   )
}

export default App
