import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Select, TextArea } from "../index";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";

const ModalEditEvent = ({ eventToEdit, setContentView, setEventToEdit, date }) => {

   const options = ["Trening", "Mecz", "Mecz towarzyski", "Inne"];
   const { currentUser } = useContext(AuthContext);
   const navigate = useNavigate()
   const [event, setEvent] = useState({
     id_user_event: currentUser.id,
     type: "Trening",
     date: "",
     place: "",
     desc: "",
     rival: "",
   });

   useEffect(() => {
      const fetchEvent = async () => {
         try {
            const res = await axios.get(`http://localhost:8800/events/event/${eventToEdit}?id_user_event=${currentUser.id}`)
            let hours 
            new Date(res.data.date).getHours() > 9 
               ? hours = new Date(res.data.date).getHours() 
               : hours = `0${new Date(res.data.date).getHours()}`
            let minutes
            new Date(res.data.date).getMinutes() > 9 
               ? minutes = new Date(res.data.date).getMinutes()
               : minutes = `0${new Date(res.data.date).getMinutes()}`

            setEvent({ ...res.data, date: `${hours}:${minutes}` })
         } catch (error) {
            console.log(error);
         }
      }
      fetchEvent()
   },[])

 
   const visibleRivalInput = () => {
     if (event.type === "Mecz" || event.type === "Mecz towarzyski") {
       return true;
     } else {
       return false;
     }
   };
 
   const handleChange = (e) => {
     setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
 
 
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     let time = `${date.year}-${date.month}-${date.day} ${event.date}:00`
     const newEvent = {
       ...event,
       date: time,
     };
     console.log(newEvent);
     try {
       await axios.put(`http://localhost:8800/events/${eventToEdit}?id_user_event=${currentUser.id}`, newEvent)
      //  navigate('/calendar')
       setContentView("listEvent")
     } catch (error) {
       console.log(error);
     }
   };

   return (
      <div>
         <h1 className="text-xl font-bold py-4">Dodaj wydarzenie</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="pb-5 mb-5 flex flex-col border-b border-[#3b3e4e]">
               <label>Rodziaj: *</label>
               <Select
                  value={event.type}
                  required={true}
                  onChange={handleChange}
                  name="type"
                  className="w-full"
                  placeholder="wybierz"
                  options={options}
               />
            </div>
            <label>Godzina: *</label>
            <Input
               value={event.date}
               // value="17:00"
               required={true}
               onChange={handleChange}
               name="date"
               type="time"
               placeholder="wybierz"
            />

            <label>Miejsce: *</label>
            <Input
               value={event.place && event.place}
               required={true}
               onChange={handleChange}
               name="place"
               type="text"
               placeholder="Miejsce"
            />

            {visibleRivalInput() && (
               <div className="flex flex-col">
                  <label>Przeciwnik: *</label>
                  <Input
                     value={event.rival}
                     required={true}
                     onChange={handleChange}
                     name="rival"
                     type="text"
                     placeholder="Przeciwnik"
                  />
               </div>
            )}

            <label>Opis:</label>
            <TextArea
               value={event.desc && event.desc}
               required={false}
               onChange={handleChange}
               name="desc"
               minHeight="200px"
               type="text"
               placeholder="Opis"
            />

            <div className="py-2 flex justify-center">
               <Button 
                  icon={<FaSave/>}
                  color="blue" 
                  label="Zapisz" />
            </div>
         </form>
      </div>
   )
}

export default ModalEditEvent