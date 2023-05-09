import React, { useEffect, useState, Component } from "react";
import { NextPage } from "next";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
("moment/locale/nb");
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

const CalendarPage = ({ allPosts }) => {
	const [allEvents, setAllEvents] = useState(allPosts);

	return (
		<div className="container mx-auto px-10">
			<h1 className="text-4xl my-8 mb-5">Calendario de eventos</h1>
			<Calendar
				localizer={localizer}
				events={allEvents}
				startAccessor={(event) => {
					return new Date(event.start);
				}}
				endAccessor={(event) => {
					return new Date(event.start);
				}}
				style={{ height: 650 }}
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

export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/eventos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let allPosts = await res.json();

	return {
		props: { allPosts: allPosts.data }
	};
}
