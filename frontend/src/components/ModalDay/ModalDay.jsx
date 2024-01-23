import React, { useState } from "react";
import { ModalAddEvent, Button, ModalEventList, ModalEditEvent } from "../index";
import { months } from "../../data/calendar";
import { FaX } from "react-icons/fa6";

const ModalDay = ({ setShowModal, date, events }) => {
  const [contentView, setContentView] = useState("listEvent");
  const [eventToEdit, setEventToEdit] = useState(null)

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center overflow-auto">
      <div className="w-[500px] bg-[#191c24] card ">
        <div className="border-b border-[#3b3e4e] p-4 flex items-center">
          <h1 className="text-xl font-bold mr-auto">
            {date.day} / {months[date.month - 1]} / {date.year}
          </h1>
          <Button
            onClick={() => setShowModal(false)}
            color="red"
            size="s"
            icon={<FaX />}
          />
        </div>
        <div className="h-[400px] md:h-[500px] p-4 overflow-auto">
          {contentView === "listEvent" && <ModalEventList date={date} events={events} setShowModal={setShowModal} setEventToEdit={setEventToEdit} setContentView={setContentView} />}
          {contentView === "updateEvent" && <ModalEditEvent date={date} eventToEdit={eventToEdit} setEventToEdit={setEventToEdit} setContentView={setContentView} />}
          {contentView === "addEvent" && <ModalAddEvent date={date} setContentView={setContentView} />}
        </div>
        <div className="border-t border-[#3b3e4e] p-6 flex justify-end gap-4">
          {contentView !== "addEvent" && (
            <Button
              onClick={() => setContentView("addEvent")}
              color="blue"
              label="Dodaj wydarzenie"
            />
          )}
          {contentView !== "listEvent" && (
            <Button
              onClick={() => setContentView("listEvent")}
              color="blue"
              label="Lista"
            />
          )}
          <Button
            onClick={() => setShowModal(false)}
            color="red"
            label="Anuluj"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDay;
