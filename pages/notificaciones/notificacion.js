import { Card, Row, Col, Container, Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import fetch from "node-fetch";

const Eventos = (props) => {
	const { defaultEvents } = props;
	const [events, setEvents] = useState(defaultEvents);
	const [inventarios, setInventarios] = useState([]);

	const reloadEvents = async () => {
		let res = await fetch("http://localhost:3000/api/eventos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _events = await res.json();
		const filteredEvents = _events.data.filter((event) => event.notificacion === true);
		setEvents(filteredEvents);
	};

	const reloadInventario = async () => {
		let res = await fetch("http://localhost:3000/api/Inventario", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let inventario = await res.json();
		const filteredInventario = inventario.data.filter((item) => item.notificacion === true);
		setInventarios(filteredInventario);
	};

	useEffect(() => {
		reloadEvents();
		reloadInventario();
	}, []);

	//-------------------------------------------------------

	const [ModShow, setModShow] = useState(false);
	const handleModShow = (id) => {
		setModid(id);
		setModShow(true);
	};
	const handleModClose = () => {
		setModShow(false);
	};

	const [ModShow1, setModShow1] = useState(false);
	const handleModShow1 = (id) => {
		setModid1(id);
		setModShow1(true);
	};
	const handleModClose1 = () => {
		setModShow1(false);
	};

	const [Modid, setModid] = useState(null);
	const [Modid1, setModid1] = useState(null);

	//Actualizar id para data (evento)
	useEffect(() => {
		setData((prevData) => ({
			...prevData,
			_id: Modid
		}));
	}, [Modid]);

	//Actualizar id para data1 (inventario)
	useEffect(() => {
		setData1((prevData) => ({
			...prevData,
			_id: Modid1
		}));
	}, [Modid1]);

	//Modificar a evneto
	const handleProceso = async () => {
		// console.log(Modid);
		// console.log(data);
		const putResponse = await fetch(`http://localhost:3000/api/eventos?eventid=${Modid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		//reinicio
		setModShow(false);
		window.location.href = "/notificaciones/notificacion";
	};

	const [data, setData] = useState({
		_id: Modid,
		notificacion: false
	});

	//Modificar a Finalizado
	const handleFinalizado = async () => {
		// console.log(Modid);
		// console.log(data1);
		const putResponse = await fetch(`http://localhost:3000/api/Inventario?inventarioid=${Modid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data1)
		});
		//reinicio
		setModShow(false);
		window.location.href = "/notificaciones/notificacion";
	};

	const [data1, setData1] = useState({
		_id: Modid1,
		notificacion: false,
		estado: null
	});

	//--------------------------------------------------------

	return (
		<div>
			<h1 className="display-3 text-center mb-5">Notificaciones</h1>
			<Container>
				<Row>
					<Col md={6}>
						<div className="whatsapp-column">
							<h2 className="mb-4">Evento</h2>
							<div className="card-container event-scroll-container">
								{events.map((event, index) => (
									<Card key={event._id} className="mb-4">
										<Card.Body>
											<div className="row">
												<Row>
													<Card.Title className="modal-title mb-3">Evento {index + 1}</Card.Title>
												</Row>
												<Row>
													<Col>
														<Card.Text>
															<strong>Nombre: </strong> {event.nombre_cliente}
														</Card.Text>
														<Card.Text>
															<strong>Estado cambiado a: </strong> {event.estado}
														</Card.Text>
													</Col>

													<Col>
														<Button className="btn btn-info btn-sm" onClick={() => handleModShow(event._id)}>
															<FontAwesomeIcon icon={faPencilAlt} /> Marcar como leido
														</Button>
													</Col>
												</Row>
											</div>
											<br />
											<div className="button-group"></div>
										</Card.Body>
									</Card>
								))}
							</div>
						</div>
					</Col>
					<Col md={6}>
						<div className="whatsapp-column">
							<h2 className="mb-4">Inventario</h2>
							<div className="card-container inventory-scroll-container">
								{inventarios.map((inventario, index) => (
									<Card key={inventario._id} className="mb-4">
										<Card.Body>
											<div className="row">
												<Row>
													<Card.Title className="modal-title mb-3">Inventario {index + 1}</Card.Title>
												</Row>
												<Row>
													<Col>
														<Card.Text>
															<strong>Nombre: </strong> {inventario.nombre}
														</Card.Text>
														<Card.Text>
															<strong>Detalle: </strong> {inventario.estado}
														</Card.Text>
													</Col>

													<Col>
														<Button className="btn btn-info btn-sm" onClick={() => handleModShow(event._id)}>
															<FontAwesomeIcon icon={faPencilAlt} /> Marcar como leido
														</Button>
													</Col>
												</Row>
											</div>
											<br />
											<div className="button-group"></div>
										</Card.Body>
									</Card>
								))}
							</div>
						</div>
					</Col>
					<Col md={6}>
						<div className="whatsapp-column">
							<h2 className="mb-4">Inventario</h2>
							<div className="card-container inventory-scroll-container">
								{inventarios.map((inventario, index) => (
									<Card key={inventario._id} className="mb-4">
										<Card.Body>
											<div className="row">
												<Row>
													<Card.Title className="modal-title mb-3">Inventario {index + 1}</Card.Title>
												</Row>
												<Row>
													<Col>
														<Card.Text>
															<strong>Nombre: </strong> {inventario.nombre}
														</Card.Text>
														<Card.Text>
															<strong>Detalle: </strong> {inventario.estado}
														</Card.Text>
													</Col>

													<Col>
														<Button className="btn btn-info btn-sm" onClick={() => handleModShow1(inventario._id)}>
															<FontAwesomeIcon icon={faPencilAlt} /> Marcar como leido
														</Button>
													</Col>
												</Row>
											</div>
											<br />
											<div className="button-group"></div>
										</Card.Body>
									</Card>
								))}
							</div>
						</div>
					</Col>
				</Row>
			</Container>

			<Modal show={ModShow} onHide={handleModClose}>
				<Modal.Header closeButton>
					<Modal.Title>Estado del evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>Marcar la notificacion como leido: </Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button onClick={handleProceso}>Aceptar</Button>
					<Button onClick={handleModClose}>Cancelar</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={ModShow1} onHide={handleModClose1}>
				<Modal.Header closeButton>
					<Modal.Title>Cambiar estado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Marcar la notificacion como leido </Modal.Body>
				<Modal.Footer className="d-flex justify-content-center">
					<Button onClick={handleFinalizado}>Aceptar</Button>
					<Button onClick={handleModClose1}>Cancelar</Button>
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
