import React, { useState, useContext } from "react";
import { Button, Input, Select, TextArea } from "../index";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalAddEvent = ({ date, setContentView }) => {
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
    // e.preventDefault();
    let time = `${date.year}-${date.month}-${date.day} ${event.date}:00`
    const newEvent = {
      ...event,
      date: time,
    };
    try {
      await axios.post("http://localhost:8800/events/addEvent", newEvent)
      // navigate('/calendar')
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
          required={true}
          onChange={handleChange}
          name="date"
          type="time"
          placeholder="wybierz"
        />

        <label>Miejsce: *</label>
        <Input
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
          required={false}
          onChange={handleChange}
          name="desc"
          minHeight="200px"
          type="text"
          placeholder="Opis"
        />

        <div className="py-2 flex justify-center">
          <Button 
            color="blue" 
            label="Dodaj wydarzenie" />
        </div>
      </form>
    </div>
  );
};

export default ModalAddEvent;
