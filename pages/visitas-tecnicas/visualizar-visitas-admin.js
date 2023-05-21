import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { all } from "axios";
("moment/locale/nb");
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);

const CalendarPage = ({ allPosts }) => {
	const events = [];
	for (let i = 0; i < allPosts.length; i++) {
		const fecha_inicio = moment(allPosts[i].fecha_hora_visita_terreno).format("YYYY-MM-DD HH:mm:ss");
		events.push({
			id: allPosts[i]._id,
			title: allPosts[i].nombre_cliente,
			start: fecha_inicio,
			end: fecha_inicio,
			allDay: false,
			//otras cosas
			contacto: allPosts[i].numero_contacto_cliente,
			direccion: allPosts[i].direccion_cliente,
			descripcion: allPosts[i].descripcion
		});
	}

	const [allEvents, setAllEvents] = useState(events);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const goToModificacion = (id) => {
		//redirigiendo a la pagina de modificacion
		window.location.href = `/visitas-tecnicas/modificar-visita?id=${id}`;
	};

	const [modalData, setModalData] = useState([]);

	const handleEventClick = (event) => {
		const f_inicio = moment(event.start).format("DD/MM/YYYY");
		const h_inicio = moment(event.start).format("HH:mm");
		const data = {
			id: event.id,
			nombre_cliente: event.title,
			numero_contacto_cliente: event.contacto,
			direccion_cliente: event.direccion,
			f_inicio: f_inicio,
			h_inicio: h_inicio,
			descripcion: event.descripcion
		};
		setModalData(data);
		setShow(true);
	};

	return (
		<>
			<div className="container mx-auto px-10 mb-5">
				<h1 className="text-4xl my-8 mb-5">Calendario de visitas técnicas</h1>
				<Calendar
					localizer={localizer}
					events={allEvents}
					onSelectEvent={handleEventClick}
					startAccessor={(event) => {
						return new Date(event.start);
					}}
					endAccessor={(event) => {
						return new Date(event.end);
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
					<p>
						<strong>Nombre: </strong> {modalData.nombre_cliente}{" "}
					</p>
					<p>
						<strong>Número de contacto: </strong>
						{modalData.numero_contacto_cliente}{" "}
					</p>
					<p>
						<strong>Dirección: </strong>
						{modalData.direccion_cliente}{" "}
					</p>
					<Row>
						<Col xs={10} md={6}>
							<p>
								<strong>Fecha: </strong>
								{modalData.f_inicio}{" "}
							</p>
						</Col>
						<Col xs={6} md={4}>
							<p>
								<strong>Hora: </strong>
								{modalData.h_inicio}{" "}
							</p>
						</Col>
					</Row>
					<p>
						<strong>Descripción: </strong>
						{modalData.descripcion}{" "}
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => goToModificacion(modalData.id)}>
						Modificar detalles
					</Button>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default CalendarPage;

export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/visitas", {
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
