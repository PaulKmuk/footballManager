import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ModalAccept } from "../index"
import { MdDeleteForever, MdList, MdEdit } from "react-icons/md";
import axios from "axios";

const ModalEventList = ({ date, events, setShowModal, setContentView, setEventToEdit }) => {
  const [listEvent, setListEvent] = useState([]);
  const [idToDelete, setIdToDelete] = useState(null)
  const [showModalAccept, setShowModalAccept] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const newArray = events.filter(
      (el) =>
        date.year === new Date(el.date).getFullYear() &&
        date.month === new Date(el.date).getMonth() + 1 &&
        date.day === new Date(el.date).getDate()
    );
    newArray.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setListEvent(newArray);
  }, [events]);

  const getColor = (type) => {
    if (type === "Trening") return "var(--training)";
    if (type === "Mecz") return "var(--match)";
    if (type === "Mecz towarzyski") return "var(--match-frendly)";
    if (type === "Inne") return "var(--other)";
    return "#fff";
  };
  const getColorLight = (type) => {
    if (type === "Trening") return "var(--light-training)";
    if (type === "Mecz") return "var(--light-match)";
    if (type === "Mecz towarzyski") return "var(--light-match-frendly)";
    if (type === "Inne") return "var(--light-other)";
    return "#fff";
  };

  const handelDeleteEvent = async () => {
		const id_user = JSON.parse(localStorage.getItem("user")).id
		try {
			axios.delete(`http://localhost:8800/events/${idToDelete}?id_user_event=${id_user}`)
			setShowModalAccept(false)
			setShowModal(false)
			navigate("/calendar")
		} catch (error) {
			console.log(error);
		}
  }

  return (
		<div>
		{listEvent.length === 0 ? (
			<div>
				<p className="py-20 text-xl text-[#7d829b] text-center">
				-- Brak zadań --
				</p>
			</div>
		) : (
			<div className="flex flex-col gap-4">
				{listEvent.map((el, index) => (
				<div
					key={index}
					style={{ backgroundColor: getColor(el.type) }}
					className="text-black font-semibold text-lg rounded-lg"
				>
					{/* --- HEADER ---   */}
					<div className="flex border-b border-[#3b3e4e] p-4">
						<p>{el.type} <span className="font-black pl-4">{el.rival}</span></p>
						<p className="ml-auto">
						{new Date(el.date).getHours() < 10
							? `0${new Date(el.date).getHours()}`
							: new Date(el.date).getHours()}
						:
						{new Date(el.date).getMinutes() < 10
							? `0${new Date(el.date).getMinutes()}`
							: new Date(el.date).getMinutes()}
						</p>
					</div>

					{/* --- CONTENT ---  */}
					<div className="border-b border-[#3b3e4e] p-4">
						<p>{el.place}</p>
						<div style={{ backgroundColor: getColorLight(el.type) }} className="min-h-[60px] rounded-lg p-2 text-sm">
							{el.desc ? <p>{el.desc}</p> : "Brak opisu"}
						</div>
					</div>
					{/* --- BUTTONS ---  */}
					<div className="flex py-2 px-4 justify-end gap-4">
						<Button 
							onClick={() => {
								setContentView("updateEvent")
								setEventToEdit(el.id)
							}}
							size="m"
							icon={<MdEdit/>}
							label='Edytuj'
							color='blue'/>
						<Button 
							size="m"
							label='Szczegóły'
							color='blue'/>
						<Button 
							onClick={() => {
								setShowModalAccept(true)
								setIdToDelete(el.id)
							}}
							size="m"
							icon={<MdDeleteForever/>}
							label='Usuń'
							color='red'/>
					</div>
				</div>
				))}
			</div>
		)}
		{showModalAccept && (
			<ModalAccept 
				title="Usuń wydarzenie"
				description="Czy na pewno chcesz usunąć to wydarzenie?"
				labelButton="Usuń"
				icon={<MdDeleteForever/>}
				color='red'
				onClickAccept={() => handelDeleteEvent()}
				onClickCancel={() => {
					setIdToDelete(null)
					setShowModalAccept(false)
				}}
			/>
		)}
		</div>
  	);
};

export default ModalEventList;

