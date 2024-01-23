import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { FaCalendarAlt, FaClock, FaList } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState, useContext } from 'react'
import { Button, ModalAccept, ModalAttend, Select } from '../../components';

const Trainings = () => {

   const [trainings, setTrainings] = useState([])
   const [allTrening, setAllTrening] = useState(true)
   const [idEventToDelete, setIdEventToDelete] = useState(null)
   const [eventToAttend, setEventToAttend] = useState(null)
   const [attendedUser, setAttendedUser] = useState([])
   const [selectDate, setSelectDate] = useState({year: new Date().getFullYear(), month: new Date().getMonth()})

   const { currentUser } = useContext(AuthContext)

   useEffect(() => {
      const type = "Trening"
      const fetchData = async () => {
         try {
            const res = await axios.get(`http://localhost:8800/events?type=${type}&id_user_event=${currentUser.id}`)
            const array = res.data.sort((a, b) => new Date(a.date) - new Date(b.date))
            if(allTrening) {
               setTrainings(array)
            } else {
               const newArray = array.filter(el => new Date(el.date).getFullYear() === selectDate.year && new Date(el.date).getMonth() === selectDate.month)
               setTrainings(newArray)
            }
         } catch (error) {
            console.log(error);
         }
      }
      fetchData()
   },[trainings])

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(`http://localhost:8800/attend/user/${currentUser.id}`)
            setAttendedUser(res.data)
         } catch (error) {
            console.log(error);
         }
      }
      fetchData()
   },[attendedUser])

   const getCountAttendedInTrainingAll = (idTraining) => {
      const treningArray = attendedUser.filter(el => el.id_event === idTraining)
      return treningArray.length
   }

   const getCountAttendedInTraining = (idTraining) => {
      const treningArray = attendedUser.filter(el => el.id_event === idTraining)
      let counter = 0 
      treningArray.forEach(el => {
         if(el.attended === 1) counter++
      })
      return counter
   }

   const getDateTrening = (date) => {
      let day 
      new Date(date).getDate() > 9 
         ? day = new Date(date).getDate()
         : day = `0${new Date(date).getDate()}`
      let month 
      new Date(date).getMonth() + 1 > 9
         ? month = new Date(date).getMonth() + 1
         : month = `0${new Date(date).getMonth() + 1}`
      return `${day}-${month}-${new Date(date).getFullYear()}`
   }

   const getTimeTrening = (date) => {
      let hours 
      new Date(date).getHours() > 9 
         ? hours = new Date(date).getHours()
         : hours = `0${new Date(date).getHours()}`
      let minutes 
      new Date(date).getMinutes() > 9 
         ? minutes = new Date(date).getMinutes()
         : minutes = `0${new Date(date).getMinutes()}`
      return `${hours}:${minutes}`
   }

   const handleDeleteEvent = async () => {
      try {
         await axios.delete(`http://localhost:8800/events/${idEventToDelete.id}?id_user_event=${currentUser.id}`)
         setIdEventToDelete(null)
      } catch (error) {
         console.log(error);
      }
   }

   const setDisabled = () => {
      if(allTrening) return "disabled"
      return
   }

   const optionsMonths = [ "Śtyczeń", "Luty", "Marzec", "Kwiecien", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień", ]

   const optionsYears = [2024, 2025, 2026]


   return (
      <div className='p-4'>
         <h1 className='text-xl font-bold py-4'>Treningi</h1>

         <div className='w-full bg-[#191c24] card p-2 overflow-x-auto'>

            <div className='flex md:justify-end gap-6 w-full my-4 mx-auto max-w-[1400px] min-w-[500px]'>
               <div className='flex items-center gap-4'>
                  <label>Wszystkie</label>
                  <input checked={allTrening} onChange={() => setAllTrening(prev => (!prev))} type='checkbox'/>
               </div>
               <Select 
                  disabled={setDisabled()}
                  value={selectDate.year}
                  onChange={(e) => setSelectDate(prev => ({...prev, year: parseInt(e.target.value)}))}
                  placeholder="wybierz "
                  options={optionsYears}
                  name="selectYear"
                  />
               <Select 
                  disabled={setDisabled()}
                  value={optionsMonths[selectDate.month]}
                  onChange={(e) => setSelectDate(prev => ({...prev, month: optionsMonths.indexOf(e.target.value)}))}
                  placeholder="wybierz"
                  options={optionsMonths}
                  name="selectMonth"
               />
            </div>

            <table className='w-full text-[#6c7293] my-4 mx-auto max-w-[1400px] min-w-[500px]'>
               <thead className='text-white text-sm md:text-lg'>
                  <tr className='border border-[#333542]'>
                     <th className='py-4 bg-stone-950'>Nr</th>
                     <th className='py-4 bg-stone-950'>Typ</th>
                     <th className='py-4 bg-stone-950'>Data</th>
                     <th className='py-4 bg-stone-950'>Miejsce</th>
                     <th className='py-4 bg-stone-950'>Obecność</th>
                     <th className='py-4 bg-stone-950'>Opcje</th>
                  </tr>
               </thead>
               <tbody className='text-center w-full text-sm font-bold'>
                  {trainings.map((el, index) => (
                     <tr key={index} className='h-[50px] hover:bg-[#14171d] cursor-pointer'>
                        <td className='border border-[#333542] px-2 lg:text-lg'>{index+1}</td>
                        <td className='border border-[#333542] px-2 lg:text-lg'>{el.type}</td>
                        <td className='border border-[#333542] px-2 lg:text-lg'>
                           <div className='flex items-center justify-center gap-4'>
                              <span className='flex items-center gap-2'><FaCalendarAlt />{getDateTrening(el.date)}</span> /
                              <span className='flex items-center gap-2'><FaClock />{getTimeTrening(el.date)}</span>
                           </div>
                        </td>
                        <td className='border border-[#333542] px-2 lg:text-lg'>{el.place}</td>
                        <td className='border border-[#333542] px-2 lg:text-lg'>{getCountAttendedInTraining(el.id)} / {getCountAttendedInTrainingAll(el.id)}</td>
                        <td className='border border-[#333542] px-2 lg:text-lg'>
                           <div className='flex items-center justify-center gap-4'>
                              <Button 
                                 onClick={() => setEventToAttend(el)}
                                 label='Obecność'
                                 color='blue'
                                 size='s'
                                 icon={<FaList />}
                              />
                              <Button 
                                 onClick={() => setIdEventToDelete(el)}
                                 label='Usuń'
                                 color='red'
                                 size='s'
                                 icon={<MdDeleteForever />}
                              />
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {/* --- MODAL ATTEND ACCEPT ---  */}
            {eventToAttend && (
               <ModalAttend 
                  eventToAttend={eventToAttend}
                  setEventToAttend={setEventToAttend}
               />
            )}

            
            {/* --- MODAL DELETE ACCEPT ---  */}
            {idEventToDelete && (
               <ModalAccept 
                  title='Usuń wydarzenie'
                  description='Czy na pewno chcesz usunąć to wydarzenie?'
                  color='red'
                  icon={<TiDelete />}
                  onClickAccept={() => handleDeleteEvent()}
                  labelButton='Usuń'
                  onClickCancel={() => setIdEventToDelete(null)}
               />
            )}
         </div>
      </div>
   )
}

export default Trainings