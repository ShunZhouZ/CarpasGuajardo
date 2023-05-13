import React, { useEffect, useState, Component } from "react";
import { NextPage } from "next";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
("moment/locale/nb");
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

const CalendarWorkerPage = ({ allPosts }) => {
	const [allEvents, setAllEvents] = useState(allPosts);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const handleEventClick = (event) => {
		console.log("click en evento");
		setShow(true);
	};

	return (
		<>
			<div className="container mx-auto px-10">
				<h1 className="text-4xl my-8">Calendario de eventos</h1>
				<Calendar
					localizer={localizer}
					events={allEvents}
					onSelectEvent={handleEventClick}
					startAccessor={(event) => {
						return new Date(event.start);
					}}
					endAccessor={(event) => {
						return new Date(event.start);
					}}
					defaultView={Views.WEEK}
					views={{
						week: true,
						day: true
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

			<Modal key={1} show={show} size="lg" centered onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Detalles de evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h6>Nombre: </h6>
					<h6>Contacto: </h6>
					<h6>Dirección: </h6>
					<Row>
						<Col xs={10} md={6}>
							<h6>Fecha de inicio: </h6>
						</Col>
						<Col xs={6} md={4}>
							<h6>Hora de inicio: </h6>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<h6>Fecha de fin: </h6>
						</Col>
						<Col xs={6} md={4}>
							<h6>Hora de fin: </h6>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<h6>Total: </h6>
						</Col>
						<Col xs={6} md={4}>
							<h6>Abono: </h6>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<h6>Tipo de encarpado: </h6>
						</Col>
						<Col xs={6} md={4}>
							<h6>Cubrepiso: </h6>
						</Col>
					</Row>
					<h6>Descripción: </h6>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary">Modificar detalles</Button>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CalendarWorkerPage;

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
