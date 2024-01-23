import React, { useEffect, useContext, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { AuthContext } from "../../context/authContext"
import { Oval } from "react-loader-spinner"
import imgPlayer from '../../../public/upload/1704357554887robert_lewandowski.jpg'

const PlayerProfile = () => {

    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()
    const [ player, setPlayer ] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:8800/players/player/${parseInt(id)}?id_user=${currentUser.id}`)
            setPlayer(res.data[0])
        }
        fetchData()
    },[])

    return (
        <div className='w-full bg-[#191c24] card p-2'>

            <div className='p-4 md:p-10 flex justify-center items-center'>
                {player === '' 
                    ?    <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    : <img src={`../../../public/upload/${player.imgPlayer}`} className='h-[150px] md:h-[250px] lg:h-[300px] object-cover rounded-lg'/>}
            </div>
            <div>
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='font-bold text-xl md:text-2xl'>{player.name} {player.lastname}</h1>
                    <h4 className='font-bold text-md md:text-xl bg-[#2b2f3a] px-4 py-2 rounded-lg'>Zawodnik</h4>
                </div>

                <div className='text-[#6c7293] text-md md:text-lg lg:text-2xl font-semibold py-4 px-10'>
                    <p className='font-bold text-xl md:text-3xl pb-4'>Szczegóły</p>

                    <div className='border-b border-[#333542]'></div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-4 pt-4'>
                            <label>Imię: </label>
                            <p>{player.name}</p>
                        </div>

                        <div className='flex gap-4'>
                            <label>Nazwisko: </label>
                            <p>{player.lastname}</p>
                        </div>

                        <div className='flex gap-4'>
                            <label>Pozycja: </label>
                            <p>{player.position}</p>
                        </div>

                        <div className='flex gap-4'>
                            <label>Rok urodzenia: </label>
                            <p>{player.dateOfBirth}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlayerProfile