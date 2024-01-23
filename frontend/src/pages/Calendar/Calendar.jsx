import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Button, ModalDay } from "../../components";
import DayInCalendar from "./DayInCalendar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import {
  weekDays,
  months,
  getDaysInMonth,
  getDaysNextMonth,
  getDaysPrevMonth,
} from "../../data/calendar";
import axios from "axios";

const Calendar = () => {
  const [date, setDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [events, setEvents] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await axios.get(`http://localhost:8800/events/${currentUser.id}`)
				setEvents(res.data)
			} catch (error) {
				console.log(error);
			}
		}
		fetchEvents()
  },[events])

  const handleChangeMonth = (x) => {
    if (x === -1) {
      if (date.month >= 2)
        setDate((prev) => ({ ...prev, month: prev.month - 1 }));
      if (date.month === 1)
        setDate((prev) => ({ ...prev, month: 12, year: prev.year - 1 }));
    }
    if (x === 1) {
      if (date.month <= 11)
        setDate((prev) => ({ ...prev, month: prev.month + 1 }));
      if (date.month === 12)
        setDate((prev) => ({ ...prev, month: 1, year: prev.year + 1 }));
    }
  };

  const getCurrentDay = (day) => {
    const currentDay = new Date();
    if (
      currentDay.getFullYear() === date.year &&
      currentDay.getMonth() + 1 === date.month &&
      currentDay.getDate() === day
    )
      return true;
    return false;
  };

  const handleClickOnDay = (selectDay) => {
    setDate((prev) => ({ ...prev, day: selectDay }));
    setShowModal(true);
  };

  const daysPrevMonth = getDaysPrevMonth(date.year, date.month);
  const daysMonth = getDaysInMonth(date.year, date.month);
  const daysNextMonth = getDaysNextMonth(date.year, date.month);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold py-4">Kalendarz</h1>

      <div className="w-full bg-[#191c24] card px-2 py-6 overflow-x-auto">
        <div className="max-w-[1500px] min-w-[500px] mx-auto ">
          <div className="flex items-center text-[#6c7293]">
            <h1 className="text-xl font-bold py-4">
              {months[date.month - 1]} {date.year}
            </h1>
            <div className="ml-auto flex gap-2">
              <Button
                onClick={() => handleChangeMonth(-1)}
                color="blue"
                icon={<FaAngleLeft />}
              />
              <Button
                onClick={() => handleChangeMonth(1)}
                color="blue"
                icon={<FaAngleRight />}
              />
            </div>
          </div>

          {/* --- Days of Week ---  */}
          <div className="grid grid-cols-7 border-b border-[#3b3e4e] text-[#6c7293] font-bold text-center">
            {weekDays.map((day) => (
              <div key={day.label}>
                <p className="max-sm:hidden">{day.label}</p>
                <p className="sm:hidden">{day.shortLabel}</p>
              </div>
            ))}
          </div>

          {/* --- Days ---  */}
          <div className="grid grid-cols-7 border-l border-[#3b3e4e]">
            {/* --- Days prev month ---  */}
            {daysPrevMonth.map((day) => (
              <div
                key={day}
                className="min-h-[100px] border-r border-b border-[#3b3e4e]"
              >
                <p className="flex justify-center items-center w-6 h-6 font-bold rounded-full text-[#343644] text-sm">
                  {day}
                </p>
              </div>
            ))}

            {/* --- Days month ---  */}
            {daysMonth.map((day) => (
              <div
                onClick={() => handleClickOnDay(day)}
                key={day}
                className="min-h-[100px] max-h-[150px] overflow-auto border-r border-b border-[#3b3e4e] flex flex-col cursor-pointer hover:bg-[#232731]"
              >
                <p
                  className={
                    getCurrentDay(day)
                      ? "flex justify-center items-center w-6 h-6 font-bold rounded-full text-[#6c7293 bg-blue-500 text-xs sm:text-sm"
                      : "flex justify-center items-center w-6 h-6 font-bold rounded-full text-[#7d829b] text-xs sm:text-sm"
                  }
                >
                  {day}
                </p>
                <DayInCalendar 
					 	dateDay={{ ...date, day }}
					 	events={events}/>
              </div>
            ))}

            {/* --- Days next month ---  */}
            {daysNextMonth.map((day) => (
              <div
                key={day}
                className="min-h-[100px] border-r border-b border-[#3b3e4e]"
              >
                <p className="flex justify-center items-center w-6 h-6 font-bold rounded-full text-[#343644] text-sm">
                  {day}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL DAY ---  */}
      {showModal && <ModalDay setShowModal={setShowModal} date={date} events={events} />}
    </div>
  );
};

export default Calendar;
