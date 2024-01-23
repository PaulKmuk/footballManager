import React, { useEffect, useState } from 'react'

const DayInCalendar = ({ events, dateDay }) => {

	const [eventsInDay, setEventsInDay] = useState([])

	useEffect( () => {
		const newArray = events.filter(el => 
			dateDay.year === new Date(el.date).getFullYear() && 
			dateDay.month === new Date(el.date).getMonth()+1 && 
			dateDay.day === new Date(el.date).getDate() 
		)
		newArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		setEventsInDay(newArray)
	},[events, dateDay])

	const getColor = (type) => {
		if(type === "Trening") return "var(--training)"
		if(type === "Mecz") return "var(--match)"
		if(type === "Mecz towarzyski") return "var(--match-frendly)"
		if(type === "Inne") return "var(--other)"
		return "#fff"
	}

	return (
		<div className='p-2 flex flex-col gap-2'>
				{eventsInDay.length !== 0 && (
					eventsInDay.map((el, index) => (
						<div 
							style={{ backgroundColor: getColor(el.type) }}
							className='flex flex-col px-2 py-[1px] text-black font-bold rounded-xl text-xs sm:text-sm md:text-base overflow-hidden'
							key={index}
						>
							<div className='flex'>
								<p>{el.type}</p>
								<p
									className='ml-auto max-lg:hidden'
								>
									{new Date(el.date).getHours() < 10
										? `0${(new Date(el.date).getHours())}`
										: new Date(el.date).getHours()}
									:
									{new Date(el.date).getMinutes() < 10
										? `0${(new Date(el.date).getMinutes())}`
										: new Date(el.date).getMinutes()}
								</p>
							</div>
							<p className='font-black'>{el.rival}</p>
						</div>
					))
				)}
		</div>
	)
}


export default DayInCalendar