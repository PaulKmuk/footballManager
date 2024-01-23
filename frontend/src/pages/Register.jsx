import React, { useState } from 'react'
import bgLogin from "../img/loginIMG.jpg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [err, setErr] = useState(null);
    const navigate = useNavigate()

    const handleChangeInputs = (e) => {
        setNewUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/auth/register", newUser)
            navigate("/login")
        } catch (error) {
            setErr(error.response.data)
        }
    }

    return (
        <div 
            className='w-full h-screen bg-cover bg-center'
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            <div className='w-full h-full flex justify-center items-center bg-black bg-opacity-60'>

                <div className='card w-full md:w-[500px] m-4 p-4 sm:p-10'>
                    <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl py-4 md:pb-10 tracking-wide'>Rejestracja</h1>
                    <form className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-light tracking-wide'>Nazwa użytkownika *</label>
                            <input
                                required
                                onChange={handleChangeInputs}
                                className='md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400' placeholder='Użytkownik' type='text' name='username'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-light tracking-wide'>Email *</label>
                            <input
                                required
                                onChange={handleChangeInputs}
                                className='md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400' placeholder='Email' type='email' name='email'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-light tracking-wide'>Hasło *</label>
                            <input
                                required
                                onChange={handleChangeInputs}
                                className='md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400' placeholder='Hasło' type='password' name='password'/>
                        </div>
                        <p className='text-red-600'>{err}</p>
                        <button onClick={handleSubmit} className='bg-blue-500 py-4 tracking-wider hover:bg-blue-600'>Zarejestruj</button>
                    </form>
                    <p className='text-center pt-8'>Nie masz konta? <Link className='text-blue-600 hover:text-blue-700 hover:underline' to='/login'>Zajoguj się</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Register