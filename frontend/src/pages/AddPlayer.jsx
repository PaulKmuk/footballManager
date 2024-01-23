import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { Button, Input, Select } from '../components'
import { FaPlus } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from 'react-router-dom';

const AddPlayer = () => {


    const data = useContext(AuthContext)
    const navigate = useNavigate()
    const options = ['BR', 'OBR', 'POM', 'NAP']
    const [error, setError] = useState('')
    const [newPlayer, setNewPlayer] = useState({
        id_user: data.currentUser.id,
        name: '',
        lastname: '',
        dateOfBirth: '',
        position: '',
    })

    const handleChange = (e) => {
        setNewPlayer(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitAddPlayer = async (e) => {
        e.preventDefault()

        if(newPlayer.dateOfBirth >= new Date().getFullYear() || newPlayer.dateOfBirth < 1950){
            setError("Niepoprawny rok urodzenia!")
            return
        }
        if(newPlayer.name !== '' && newPlayer.lastname !== '' && newPlayer.dateOfBirth !== '' && newPlayer.position !== '') {
            try {
                await axios.post("http://localhost:8800/players/addPlayer", newPlayer)
                navigate("/players")
                setError("")
                setNewPlayer({
                    id_user: data.currentUser.id,
                    name: '',
                    lastname: '',
                    dateOfBirth: '',
                    position: '',
                })
            } catch (err) {
                console.log(err);
                setError(err)
            }
        } else {
            setError("Wypełnij wszytskie pola!")
        }
        
    }

    

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold py-4'>Dodaj zawodnika</h1>
            <div className='w-full bg-[#191c24] card p-4 md:py-10'>
                <form
                    className='w-full mx-auto max-w-[1000px]'
                >
                    <h1 className='text-xl font-bold py-4'>Dane zawodnika:</h1> 
                    <div className='flex flex-col gap-4 text-lg font-bold'>

                        <label>Imię:</label>
                        <Input 
                            value={newPlayer.name}
                            onChange={handleChange}
                            name='name'
                            type="text"
                            placeholder='Imię'/>

                        <label>Nazwisko:</label>
                        <Input 
                            value={newPlayer.lastname}
                            onChange={handleChange}
                            name='lastname'
                            type='text'
                            placeholder='Nazwisko'/>

                        <label>Rok urodzenia:</label>
                        <Input 
                            value={newPlayer.dateOfBirth}
                            onChange={handleChange}
                            name='dateOfBirth'
                            type='number'
                            placeholder='RRRR'/>

                        <label>Pozycja:</label>
                        <Select 
                            value={newPlayer.position}
                            placeholder='wybierz pozycję'
                            onChange={handleChange}
                            name='position'
                            options={options}/>

                        <p className='text-red-500'>{error}</p>

                    </div>
                    <div className='pt-10 flex gap-4'>
                        <Link to='/players' className='ml-auto'>
                            <Button 
                                size='l'
                                icon={<GiCancel />}
                                color='red'
                                label='Anuluj'/>
                        </Link>
                        <Button 
                            onClick={submitAddPlayer}
                            size='l'
                            icon={<FaPlus />}
                            color='blue'
                            label='Dodaj'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPlayer