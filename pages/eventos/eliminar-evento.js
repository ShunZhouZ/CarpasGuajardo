import { Card, Button, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { Label } from "reactstrap";

const Eventos = (props) => {
	const [show, setShow] = useState(false);
	const { defaultEvents } = props;
	const [events, setEvents] = useState(defaultEvents);
	const [description, setDescription] = useState("");
	const [showDescriptionModal, setShowDescriptionModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAsc, setSortAsc] = useState(true);
	const [sortOrder, setSortOrder] = useState("asc"); //esto agregue para el sort
	const [filterToldo, setFilterToldo] = useState(false);
	const [filterCarpa, setFilterCarpa] = useState(false);
	const [filterIluminacion, setFilterIluminacion] = useState(false);

	const handleShowDescriptionModal = (description) => {
		setDescription(description);
		setShowDescriptionModal(true);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirmationClose = () => setShowConfirmation(false);

	const modifyElement = (id) => {
		window.location.href = `/eventos/modificar-evento?id=${id}`;
	};

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
			<h1 className="display-3 text-center mb-3">Lista de eventos</h1>
			<div className="search-input">
				<Row className="filtrosEventos">
					<Col xs={3} lg={2} md={3}>
						<div className="check-box">
							<Form.Group>
								<Form.Label>Filtrar por:</Form.Label>
								<Form.Check checked={filterToldo} onChange={handleToldoFilterChange} label="Toldo" />
								<Form.Check checked={filterCarpa} onChange={handleCarpaFilterChange} label="Carpa" />
							</Form.Group>
						</div>
					</Col>
					<Col xs={4} lg={2} md={3}>
						Ordenar por:
						<div className="button-container mt-2">
							<Button className="sort" variant="primary" size="sm" onClick={handleSortOrder}>
								Más {sortOrder === "desc" ? "recientes" : "antiguos"}
							</Button>
						</div>
					</Col>
					<Col xs={5} lg={8} md={6}>
						<InputGroup>
							<Form.Control className="input" placeholder="Búsqueda por nombre o dirección" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
							<Button>
								<FontAwesomeIcon icon={faSearch} />
							</Button>
						</InputGroup>
					</Col>
				</Row>
			</div>
			<div className="card-container">
				{sortedEvents.map((event, index) => (
					<Card key={event._id}>
						<Card.Body>
							<div className="row">
								<Row>
									<Card.Title className="modal-title mb-3">Evento {index + 1}</Card.Title>

									<Col xs={12} lg={4} md={4}>
										<Card.Text>Nombre: {event.nombre_cliente}</Card.Text>
										<Card.Text>Telefono: {event.numero_contacto_cliente}</Card.Text>
										<Card.Text>Direccion: {event.direccion_cliente}</Card.Text>
										<Card.Text>Fecha de inicio: {moment(event.fecha_inicio).format("DD-MM-YYYY")}</Card.Text>
										<Card.Text>Fecha de termino: {moment(event.fecha_termino).format("DD-MM-YYYY")}</Card.Text>
									</Col>

									<Col xs={12} lg={3} md={3}>
										<Card.Text>
											M<sup>2</sup>: {event.metros_cuadrados}
										</Card.Text>
										<Card.Text>Cubrepiso: {event.cubre_piso ? "Si" : "No"}</Card.Text>
										<Card.Text>Carpa: {event.carpa ? "Sí" : "No"}</Card.Text>
										<Card.Text>Hora de inicio: {moment(event.fecha_inicio).format("HH:mm")}</Card.Text>

										<Card.Text>Hora de termino: {moment(event.fecha_termino).format("HH:mm")}</Card.Text>
									</Col>

									<Col xs={12} lg={3} md={3}>
										<Card.Text>Toldo: {event.toldo ? "Sí" : "No"}</Card.Text>
										<Card.Text>Iluminación: {event.Iluminacion ? "Sí" : "No"}</Card.Text>
										<Card.Text>Calefacción: {event.calefaccion ? "Sí" : "No"}</Card.Text>
										<Card.Text>Monto total: {event.monto_total}</Card.Text>
										<Card.Text>Abono: {event.anticipo}</Card.Text>
									</Col>

									<Col xs={12} lg={2} md={2}>
										<Button className="btn btn-warning btn-sm mb-2" onClick={() => handleShowDescriptionModal(event.descripcion)}>
											<FontAwesomeIcon icon={faEye} />
											Descripción
										</Button>
										<br></br>
										<br></br>
										<Button className="btn btn-info btn-sm" onClick={() => modifyElement(event._id)}>
											<FontAwesomeIcon icon={faPencilAlt} /> Modificar
										</Button>
										<br></br>
										<br></br>
										<Button className="btn btn-danger btn-sm" onClick={() => deleteElement(event._id)}>
											<FontAwesomeIcon icon={faTrash} /> Eliminar
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Evento eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El evento ha sido eliminado correctamente.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showDescriptionModal} onHide={() => setShowDescriptionModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Descripción del evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>{description}</Modal.Body>
			</Modal>

			<Modal show={showConfirmation} onHide={handleConfirmationClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmación de eliminación</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Estás seguro de que deseas eliminar este evento?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleConfirmationClose}>
						Cancelar
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Eliminar
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
