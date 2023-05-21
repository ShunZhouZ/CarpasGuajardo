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
		const fecha_inicio = moment(allPosts[i].fecha_inicio).format("YYYY-MM-DD HH:mm:ss");
		const fecha_termino = moment(allPosts[i].fecha_termino).format("YYYY-MM-DD HH:mm:ss");
		events.push({
			id: allPosts[i]._id,
			title: allPosts[i].nombre_cliente,
			start: fecha_inicio,
			end: fecha_termino,
			allDay: false,
			//otras cosas
			contacto: allPosts[i].numero_contacto_cliente,
			direccion: allPosts[i].direccion_cliente,
			monto_total: allPosts[i].monto_total,
			anticipo: allPosts[i].anticipo,
			carpa: allPosts[i].carpa, //nueva
			toldo: allPosts[i].toldo, //nueva
			calefaccion: allPosts[i].calefaccion, //nueva
			iluminacion: allPosts[i].Iluminacion, //nueva
			cubre_piso: allPosts[i].cubre_piso,
			metros_cuadrados: allPosts[i].metros_cuadrados,
			descripcion: allPosts[i].descripcion
		});
	}

	const [allEvents, setAllEvents] = useState(events);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const goToModificacion = (id) => {
		//redirigiendo a la pagina de modificacion
		window.location.href = `/eventos/modificar-evento?id=${id}`;
	};

	const [modalData, setModalData] = useState([]);

	const handleEventClick = (event) => {
		const f_inicio = moment(event.start).format("DD/MM/YYYY");
		const h_inicio = moment(event.start).format("HH:mm");
		const f_termino = moment(event.end).format("DD/MM/YYYY");
		const h_termino = moment(event.end).format("HH:mm");
		const cubre_piso = event.cubre_piso ? "Sí" : "No";
		const carpa = event.carpa ? "Sí" : "No";
		const toldo = event.toldo ? "Sí" : "No";
		const calefaccion = event.calefaccion ? "Sí" : "No";
		const iluminacion = event.iluminacion ? "Sí" : "No";
		let carpa_toldo;
		if (carpa === "Sí") {
			carpa_toldo = "Carpa";
		}
		if (toldo === "Sí") {
			carpa_toldo = "Toldo";
		}
		console.log(carpa_toldo);

		const data = {
			id: event.id,
			nombre_cliente: event.title,
			numero_contacto_cliente: event.contacto,
			direccion_cliente: event.direccion,
			f_inicio: f_inicio,
			h_inicio: h_inicio,
			f_termino: f_termino,
			h_termino: h_termino,
			monto_total: event.monto_total,
			anticipo: event.anticipo,
			carpa_toldo: carpa_toldo,
			calefaccion: calefaccion,
			iluminacion: iluminacion,
			cubre_piso: cubre_piso,
			metros_cuadrados: event.metros_cuadrados,
			descripcion: event.descripcion
		};
		console.log("evento solo");
		console.log(data);
		setModalData(data);
		setShow(true);
	};

	return (
		<>
			<div className="container mx-auto px-10 mb-5">
				<h1 className="text-4xl my-8 mb-5">Calendario de eventos</h1>
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
								<strong>Fecha de inicio: </strong>
								{modalData.f_inicio}{" "}
							</p>
						</Col>
						<Col xs={10} md={6}>
							<p>
								<strong>Hora de inicio: </strong>
								{modalData.h_inicio}{" "}
							</p>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<p>
								<strong>Fecha de fin: </strong>
								{modalData.f_termino}{" "}
							</p>
						</Col>
						<Col xs={10} md={6}>
							<p>
								<strong>Hora de fin: </strong>
								{modalData.h_termino}{" "}
							</p>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<p>
								<strong>Tipo de encarpado: </strong>
								{modalData.carpa_toldo}{" "}
							</p>
						</Col>
						<Col xs={10} md={6}>
							<p>
								<strong>Cubrepiso: </strong>
								{modalData.cubre_piso}{" "}
							</p>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<p>
								<strong>Calefacción: </strong>
								{modalData.calefaccion}{" "}
							</p>
						</Col>

						<Col xs={10} md={6}>
							<p>
								<strong>iluminación: </strong>
								{modalData.iluminacion}{" "}
							</p>
						</Col>
					</Row>
					<Row>
						<Col xs={10} md={6}>
							<p>
								<strong>Total: </strong>
								{modalData.monto_total}
							</p>
						</Col>
						<Col xs={10} md={6}>
							<p>
								<strong>Abono: </strong>
								{modalData.anticipo}
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
