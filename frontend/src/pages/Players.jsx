import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import userExample from "../img/userExample.png"
import { Button, ModalAccept } from '../components';
import { Link } from 'react-router-dom';
import axios from "axios"
import { Oval } from "react-loader-spinner"


const Players = () => {

    // const players = [
    //     {
    //         id: 1,
    //         id_user: 2,
    //         name: "John",
    //         lastname: "Smith",
    //         dateOfBirth: "15-10-1992",
    //         position: "POM",
    //         imgPlayer: null
    //     },
    //     {
    //         id: 2,
    //         id_user: 2,
    //         name: "John",
    //         lastname: "Smith",
    //         dateOfBirth: "15-10-1992",
    //         position: "POM",
    //         imgPlayer: null
    //     },
    //     {
    //         id: 3,
    //         id_user: 2,
    //         name: "John",
    //         lastname: "Smith",
    //         dateOfBirth: "15-10-1992",
    //         position: "POM",
    //         imgPlayer: null
    //     },
    //     {
    //         id: 4,
    //         id_user: 2,
    //         name: "John",
    //         lastname: "Smith",
    //         dateOfBirth: "15-10-1992",
    //         position: "POM",
    //         imgPlayer: null
    //     },
    // ]

    const [players, setPlayers] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [showModalAccept, setShowModalAccept] = useState(false)
    const [idDelete, setIdDelete] = useState(null)

    const sortByPosition = { BR: 1, OBR: 2, POM: 3, NAP: 4 }
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        const fetchData = async () => {
            try {
                const arrayPlayers = await axios.get(`http://localhost:8800/players/${JSON.parse(user).id}`)
                const array = arrayPlayers.data.sort((a, b) => sortByPosition[a.position] - sortByPosition[b.position])
                setPlayers(array)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[players])


    const handleDeletePlayer = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/players/${id}?id_user=${user.id}`)
            setShowModalAccept(false)
        } catch (error) {
            console.log(error);
        }
    }


    return (
      <div className='p-4'>
            <h1 className='text-xl font-bold py-4'>Zawodnicy</h1>

            <div className='w-full bg-[#191c24] card p-2 overflow-x-auto'>

               <table className='w-full text-[#6c7293] my-4 mx-auto max-w-[1400px] min-w-[500px]'>
                  <thead className='text-white text-sm md:text-lg'>
                        <tr className='border border-[#333542]'>
                           <th className='py-4 bg-stone-950'>Nr</th>
                           <th className='py-4 bg-stone-950'>Zdjęcie</th>
                           <th className='py-4 bg-stone-950'>Zawodnik</th>
                           <th className='py-4 bg-stone-950'>Pozycja</th>
                           <th className='py-4 bg-stone-950'>Rok</th>
                           <th className='py-4 bg-stone-950'>Opcje</th>
                        </tr>
                  </thead>
                        <tbody className='text-center w-full text-sm '>
                           {players.map((player, index) => (
                              <tr
                                    key={index}
                                    className='h-[50px] hover:bg-[#14171d]'
                              >
                                    <td
                                       className='border-[0.2px] border-[#333542] w-[50px] px-2'
                                    >{index+1}.</td>
                                    <td className='border border-[#333542] px-2'>
                                       <div className='w-14 h-14 rounded-full overflow-hidden mx-auto bg-slate-400'>
                                          {/* <img src={player.imgPlayer ? player.imgPlayer : "../../public/upload/1704309654542badminton.jpg"}/> */}
                                          <img 
                                                className='w-full h-full object-cover'
                                                src={player.imgPlayer 
                                                   ? `../../public/upload/${player.imgPlayer}`
                                                   : userExample}/>
                                       </div>
                                    </td>
                                    <td
                                       className='border border-[#333542] px-2 lg:text-lg font-bold'
                                    >{player.name} {player.lastname}</td>
                                    <td
                                       className='border border-[#333542] px-2 lg:text-lg'
                                       >{player.position}</td>
                                    <td
                                       className='border border-[#333542] px-2 lg:text-lg'
                                       >{player.dateOfBirth}</td>
                                    <td
                                       className='border border-[#333542] md:w-[300px] px-2'
                                    >
                                       <div className='flex w-full justify-center gap-4'>
                                          <Link to={`/player/${player.id}`}>
                                                <Button 
                                                   color='green'
                                                   size='s'
                                                   icon={<FaSearch/>} />
                                          </Link>
                                          <Link to={`/edit-player/${player.id}`}>
                                                <Button 
                                                   color='blue'
                                                   size='s'
                                                   icon={<FaEdit/>}
                                                   label='Edytuj'/>
                                          </Link>
                                          <Button 
                                                onClick={() => {
                                                   setShowModalAccept(true)
                                                   setIdDelete(player.id)
                                                }}
                                                color='red'
                                                size='s'
                                                icon={<FaTrashAlt />}
                                                label='Usuń'/>
                                       </div>
                                    </td>
                              </tr>
                           ))}
                        </tbody>

               </table>

               <div className='py-4 flex mx-auto max-w-[1500px]'>
                  <div className='ml-auto mr-20'>
                        <Link to='/add-player'>
                           <Button 
                              label='Dodaj zawodnika'
                              icon={<FaPlusCircle />}
                              size='l'
                              color='green'
                           />
                        </Link>
                  </div>
               </div>

            </div>

            {/* --- MODAL ACCEPT ---  */}
            {showModalAccept && (
               <ModalAccept 
                  title='Usuń zawodnika'
                  labelButton='Usuń'
                  color='red'
                  icon={<GiCancel />}
                  description='Czy na pewno chcesz usunąć tego zawodnika?'
                  onClickCancel={() => {
                        setIdDelete(null)
                        setShowModalAccept(false)
                  }}
                  onClickAccept={() => handleDeletePlayer(idDelete)}/>
            )}

      </div>
   )
}

export default Players