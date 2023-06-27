import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Eventos = (props) => {
	const [show, setShow] = useState(false);
	const { defaultEvents } = props;
	const [events, setEvents] = useState(defaultEvents);
	const [description, setDescription] = useState("");
	const [showDescriptionModal, setShowDescriptionModal] = useState(false);
	const [estado, setEstado] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAsc, setSortAsc] = useState(true);
	const [sortOrder, setSortOrder] = useState("asc"); //esto agregue para el sort
	const [filterToldo, setFilterToldo] = useState(false);
	const [filterCarpa, setFilterCarpa] = useState(false);
	const [filterIluminacion, setFilterIluminacion] = useState(false);
	const buttonStyle = {
		width: "38%",
		marginBottom: "0.5rem"
	};

	const handleShowDescriptionModal = (description) => {
		setDescription(description);
		setShowDescriptionModal(true);
	};
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirmationClose = () => setShowConfirmation(false);

	//-------------------------------------------------------

	const [ModShow, setModShow] = useState(false);
	const handleModShow = (id, estado) => {
		setModid(id);
		setEstado(estado);
		setModShow(true);
	};
	const handleModClose = () => {
		setModShow(false);
		//window.location.href = "/vista-trabajador/eventos";// Reinicia la página web
	};

	const [Modid, setModid] = useState(null);

	//Actualizar id para data
	useEffect(() => {
		setData((prevData) => ({
			...prevData,
			_id: Modid
		}));
	}, [Modid]);

	//Actualizar id para data1
	useEffect(() => {
		setData1((prevData) => ({
			...prevData,
			_id: Modid
		}));
	}, [Modid]);

	//Modificar a En proceso
	const handleProceso = async () => {
		console.log(Modid);
		console.log(data);
		const putResponse = await fetch(`http://localhost:3000/api/eventos?eventid=${Modid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		//reinicio
		setModShow(false);
		window.location.href = "/vista-trabajador/eventos";
	};

	const [data, setData] = useState({
		_id: Modid,
		estado: "En proceso",
		notificacion: true
	});

	//Modificar a Finalizado
	const handleFinalizado = async () => {
		console.log(Modid);
		console.log(data1);
		const putResponse = await fetch(`http://localhost:3000/api/eventos?eventid=${Modid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data1)
		});
		//reinicio
		setModShow(false);
		window.location.href = "/vista-trabajador/eventos";
	};

	const [data1, setData1] = useState({
		_id: Modid,
		estado: "Finalizado"
	});

	//--------------------------------------------------------

	const reloadEvents = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/eventos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _events = await res.json();
		setEvents(_events.data);
	}, []);

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [eventToDelete, setEventToDelete] = useState(null);

	const deleteElement = (id) => {
		setEventToDelete(id);
		setShowConfirmation(true);
	};

	const confirmDelete = async () => {
		const deleteResponse = await fetch(`http://localhost:3000/api/eventos?id=${eventToDelete}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		handleShow();
		handleConfirmationClose();

		console.log(await deleteResponse.json());
		await reloadEvents();
	};
	//se actualizo filterevents
	const filterEvents = () => {
		const filtered = events.filter((event) => {
			const nombreCliente = event.nombre_cliente.toLowerCase();
			const direccionCliente = event.direccion_cliente.toLowerCase();
			const numeroContactoCliente = event.numero_contacto_cliente.toLowerCase();
			const includesSearchTerm =
				nombreCliente.includes(searchTerm.toLowerCase()) || direccionCliente.includes(searchTerm.toLowerCase()) || numeroContactoCliente.includes(searchTerm.toLowerCase());

			const meetsToldoFilter = filterToldo ? event.toldo : true;
			const meetsCarpaFilter = filterCarpa ? event.carpa : true;
			const meetsIluminacionFilter = filterIluminacion ? event.Iluminacion : true;

			return includesSearchTerm && meetsToldoFilter && meetsCarpaFilter && meetsIluminacionFilter;
		});

		return filtered;
	};

	const handleToldoFilterChange = (event) => {
		setFilterToldo(event.target.checked);
	};

	const handleCarpaFilterChange = (event) => {
		setFilterCarpa(event.target.checked);
	};

	const handleIluminacionFilterChange = (event) => {
		setFilterIluminacion(event.target.checked);
	};

	//hasta acaba el filterevents

	const filteredEvents = filterEvents();

	const handleSortOrder = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const sortedEvents = filteredEvents.sort((a, b) => {
		const dateA = moment(a.fecha_inicio);
		const dateB = moment(b.fecha_inicio);
		return sortOrder === "desc" ? dateA - dateB : dateB - dateA;
	});

	return (
		<div style={{ marginLeft: "50px", marginRight: "50px" }}>
			<h1 className="display-3 text-center mb-5">Lista de eventos</h1>
			<div className="search-input">
				<div className="button-container">
					<input type="text" placeholder="Buscar por nombre, dirección o teléfono" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
					<div className="check-box">
						<label>
							<input type="checkbox" checked={filterToldo} onChange={handleToldoFilterChange} />
							Toldo
						</label>
						<label>
							<input type="checkbox" checked={filterCarpa} onChange={handleCarpaFilterChange} />
							Carpa
						</label>
						<label>
							<input type="checkbox" checked={filterIluminacion} onChange={handleIluminacionFilterChange} />
							Iluminación
						</label>
					</div>
					<Button className="sort" variant="primary" onClick={handleSortOrder}>
						Mas {sortOrder === "desc" ? "recientes" : "antiguos"}
					</Button>
				</div>
			</div>
			<div className="card-container">
				{sortedEvents.map((event, index) => (
					<Card key={event._id}>
						<Card.Body>
							<div className="row">
								<Row>
									<Card.Title className="modal-title mb-3">
										Evento {index + 1} - <span style={{ fontSize: '20px' }}>{event.estado}</span>
									</Card.Title>

									<Col>
										<Card.Text>
											<strong>Nombre: </strong> {event.nombre_cliente}
										</Card.Text>
										<Card.Text>
											<strong>Direccion: </strong> {event.direccion_cliente}
										</Card.Text>
										<Card.Text>
											<strong>Fecha de inicio: </strong>
											{moment(event.fecha_inicio).format("DD-MM-YYYY")}
										</Card.Text>
										<Card.Text>
											<strong>Fecha de termino: </strong>
											{moment(event.fecha_termino).format("DD-MM-YYYY")}
										</Card.Text>
									</Col>

									<Col>
										<Card.Text>
											<strong>Cubrepiso: </strong>
											{event.cubre_piso ? "Si" : "No"}
										</Card.Text>

										<Card.Text>
											<strong>Carpa:</strong> {event.carpa ? "Sí" : "No"}
										</Card.Text>

										<Card.Text>
											<strong>Hora de inicio: </strong>
											{moment(event.fecha_inicio).format("HH:mm")}
										</Card.Text>

										<Card.Text>
											<strong>Hora de termino: </strong>
											{moment(event.fecha_termino).format("HH:mm")}
										</Card.Text>
									</Col>

									<Col>
										<Card.Text>
											<strong>Toldo:</strong> {event.toldo ? "Sí" : "No"}
										</Card.Text>
										<Card.Text>
											<strong>Iluminación:</strong> {event.Iluminacion ? "Sí" : "No"}
										</Card.Text>
										<Card.Text>
											<strong>Calefacción:</strong> {event.calefaccion ? "Sí" : "No"}
										</Card.Text>
										<Card.Text>
											<strong>
												m<sup>2</sup>:
											</strong>{" "}
											{event.metros_cuadrados}
										</Card.Text>
									</Col>

									<Col>
										<Button className="btn btn-warning btn-sm mb-2" style={buttonStyle} onClick={() => handleShowDescriptionModal(event.descripcion)}>
											<FontAwesomeIcon icon={faEye} />
											Descripción
										</Button>
										<br></br>
										<br></br>
										<Button className="btn btn-info btn-sm" style={buttonStyle} onClick={() => handleModShow(event._id, event.estado)}>
											<FontAwesomeIcon icon={faPencilAlt} /> Cambiar estado
										</Button>
									</Col>
								</Row>
							</div>
							<br></br>
							<div className="button-group"></div>
						</Card.Body>
					</Card>
				))}
			</div>

			<Modal show={showDescriptionModal} onHide={() => setShowDescriptionModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Descripción del evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>{description}</Modal.Body>
			</Modal>

			{/* ------------------------------------------------------ */}

			<Modal show={ModShow} onHide={handleModClose}>
				<Modal.Header closeButton>
					<Modal.Title>Estado del evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>Estado actual: {estado}</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button variant="info" onClick={handleProceso}>
						En proceso
					</Button>
					<Button variant="success" onClick={handleFinalizado}>
						Finalizado
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/eventos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let events = await res.json();
	return {
		props: { defaultEvents: events.data }
	};
}

export default Eventos;
