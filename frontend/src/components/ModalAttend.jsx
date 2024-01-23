import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Button } from "./index"
import axios from 'axios';

const ModalAttend = ({ eventToAttend, setEventToAttend }) => {

   const [checkedAll, setCheckedAll] = useState(false)
   const [existPrevAttend, setExistPrevAttend] = useState(false)
   const [players, setPlayers] = useState([])
   const [playersAttended, setPlayersAttended] = useState([])
   const  { currentUser } = useContext(AuthContext)

   const getTimeTrening = (date) => {
      let day 
      new Date(date).getDate() > 9 
         ? day = new Date(date).getDate()
         : day = `0${new Date(date).getDate()}`
      let month 
      new Date(date).getMonth() + 1 > 9
         ? month = new Date(date).getMonth() + 1
         : month = `0${new Date(date).getMonth() + 1}`
      let hours 
      new Date(date).getHours() > 9 
         ? hours = new Date(date).getHours()
         : hours = `0${new Date(date).getHours()}`
      let minutes 
      new Date(date).getMinutes() > 9 
         ? minutes = new Date(date).getMinutes()
         : minutes = `0${new Date(date).getMinutes()}`
      return `${new Date(date).getFullYear()}-${month}-${day} ${hours}:${minutes}:00`
   }


      
   useEffect(() => {
         
      const fetchPlayers = async () => {
         try {
            const res = await axios.get(`http://localhost:8800/players/${eventToAttend.id_user_event}`)
            setPlayers(res.data)
            const arrayAttend = res.data.map(el => {
               return {
                  id_event: eventToAttend.id, 
                  id_player: el.id,
                  date: getTimeTrening(eventToAttend.date),
                  idu: currentUser.id,
                  attended: false
               }
            })
            setPlayersAttended(arrayAttend)
         } catch (error) {
            console.log(error);
         }
      }
      fetchPlayers()
      
      const checkExistAttended = async () => {
         try {
            const attendedList = await axios.get(`http://localhost:8800/attend/${eventToAttend.id}`)
            if(attendedList.data.length > 0) {
               setPlayersAttended(attendedList.data)
               setExistPrevAttend(true)
            }
         } catch (error) {
            console.log(error);
         }

      }
      checkExistAttended()

   },[eventToAttend])

   useEffect(() => {
      playersAttended.map(el => {if(el.attended === false) {setCheckedAll(false)}})
   },[playersAttended])

   const handleCheckedAll = () => {
      if(checkedAll === false) {
         const newPlayerAttended = playersAttended.map(el =>  ({...el, attended: true}))
         setPlayersAttended(newPlayerAttended)
         setCheckedAll(true)
      } else {
         const newPlayerAttended = playersAttended.map(el =>  ({...el, attended: false}))
         setPlayersAttended(newPlayerAttended)
         setCheckedAll(false)
      }
   }

   const handleChecked = (idPlayer) => {
      let result
      playersAttended.forEach(el => {if(el.id_player === idPlayer) result = el.attended})
      return result
   }

   const handleChangeCheckbox = (idPlayer) => {
      const newPlayerAttended = playersAttended.map(el => {
         if(el.id_player !== idPlayer) return el
         if(el.id_player === idPlayer) return {...el, attended: !el.attended}
      })
      setPlayersAttended(newPlayerAttended)
   }

   useEffect(() =>{
      // console.log(players);
      console.log(playersAttended);
      // console.log(eventToAttend);
      // console.log(prevPlayersAttended);
   },[players, playersAttended])

   const handleSaveAttend = async () => { 
      if(existPrevAttend) {
         try {
            await axios.delete(`http://localhost:8800/attend/${eventToAttend.id}`)
            console.log(playersAttended);
            const newArray = playersAttended.map(el => ({ ...el, date: getTimeTrening(el.date) }))
            console.log(newArray);
            await axios.post("http://localhost:8800/attend/addAttend", newArray)
            setEventToAttend(null)
         } catch (error) {
            console.log(error);
         }
      } else {
         try {
            await axios.post("http://localhost:8800/attend/addAttend", playersAttended)
            setEventToAttend(null)
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
   <div className='absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center'>
      <div className='w-[600px] bg-[#191c24] card md:text-lg h-[600px] flex flex-col overflow-x-auto'>
         <div className='border-b border-[#3b3e4e] py-4 px-6 flex items-center'>
            <h1 className='text-lg font-bold mr-auto'>Lista obecności</h1>
            <div className='flex items-center justify-end pr-10 gap-4'>
               <label>Zaznacz wsystko: </label>
               <input type='checkbox' checked={checkedAll} onChange={() => handleCheckedAll()}/>
            </div>
         </div>

         <div className='p-6 h-full overflow-x-auto'> 
            <table className='w-full text-[#6c7293] my-4 mx-auto min-w-[300px]'>
               <thead className='text-white text-sm md:text-lg'>
                  <tr className='border border-[#333542]'>
                     <th className='py-2 bg-stone-950'>Nr</th>
                     <th className='py-2 bg-stone-950'>Zawodnik</th>
                     <th className='py-2 bg-stone-950'>Obecność</th>
                  </tr>
               </thead>
               <tbody className='text-center w-full text-sm font-bold'>
                  {players.map((el, index) => (
                     <tr onClick={() => (handleChangeCheckbox(el.id))} key={index} className=' hover:bg-[#14171d] cursor-pointer'>
                        <td className='border border-[#333542] p-2 lg:text-lg'>{index+1}</td>
                        <td className='border border-[#333542] p-2 lg:text-lg'>{el.name} {el.lastname}</td>
                        <td className='border border-[#333542] p-2 lg:text-lg'>
                           <input 
                              checked={handleChecked(el.id)}
                              onChange={() => (handleChangeCheckbox(el.id))}
                              type='checkbox'/>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className='border-t border-[#3b3e4e] px-6 py-4 flex justify-end gap-4'>
            <Button 
               onClick={() => setEventToAttend(null)}
               color='red'
               label='Anuluj'/>
            <Button 
               onClick={() => handleSaveAttend()}
               color='blue'
               label='Zapisz'/>
         </div>
      </div>
   </div>
   )
}

export default ModalAttend