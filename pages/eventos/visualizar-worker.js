import React, { useEffect, useState, Component } from "react";
import { NextPage } from "next";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
("moment/locale/nb");
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

const events = [
	{
		title: "Evento 1",
		allDay: false,
		start: new Date("2023-5-4 11:00:00"), //año, mes, dia
		end: new Date("2023-5-4 17:00:00")
	},
	{
		title: "Evento 2",
		allDay: false,
		start: new Date("2023-5-5 10:00:00"),
		end: new Date("2023-5-5 12:00:00")
	}
];

const CalendarPage = () => {
	const [allEvents, setAllEvents] = useState(events);

	return (
		<div className="container mx-auto px-10">
			<h1 className="text-4xl my-8">Calendario de eventos</h1>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 650 }}
				defaultView={Views.WEEK}
				views={{
					week: true,
					day: true
				}}
				messages={{
					next: ">>",
					today: "Hoy",
					previous: "<<",
					month: "Mes",
					week: "Semana",
					day: "Día"
				}}
				popup
			/>
		</div>
	);
};

export default CalendarPage;
