import Head from "next/head";
import withSession from "../lib/session";
import { Container, Row, Col, Table, Card, Image, Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";

export default function Home({ token, allEvents, allVisits, eventos_mes, ganancias }) {
	const rol = jwt.decode(token).rol;
	const [notificacion_eventos, setNotificacionEventos] = useState([]);
	const [notificacion_inventario, setNotificacionInventario] = useState([]);
	
	const filtrarEventosHoy = (fecha_hoy) => {
		// console.log(fecha_hoy);
		var resultado = events.filter((elemento) => {
			if (elemento.start.includes(fecha_hoy)) {
				return elemento;
			}
		});
		if (resultado.length > 0) {
			return resultado;
		} else {
			return [];
		}
	};

	const filtrarVisitasHoy = (fecha_hoy) => {
		var resultado = visits.filter((elemento) => {
			if (elemento.start.includes(fecha_hoy)) {
				return elemento;
			}
		});
		if (resultado.length > 0) {
			return resultado;
		} else {
			return [];
		}
	};

	const eventos_hoy = filtrarEventosHoy(moment().format("YYYY-MM-DD"));
	const visitas_hoy = filtrarVisitasHoy(moment().format("YYYY-MM-DD"));

	useEffect(() => {
		// filtrar por eventos con notificacion true
		const filteredEvents = allEvents.filter((event) => event.notificacion === true);
		setNotificacionEventos(filteredEvents);
	  }, [allEvents]);

	  useEffect(() => {
		reloadInventario();
	}, []);

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

	const [data1, setData1] = useState({
		_id: Modid1,
		notificacion: false,
		estado: null
	});

	//Actualizar id para data1 (inventario)
	useEffect(() => {
		setData1((prevData) => ({
			...prevData,
			_id: Modid1
		}));
	}, [Modid1]);
	
	if (rol === "administrador") {
		// traer todos los eventos
		const events = [];
		const visits = [];
		
		//todos los eventos
		for (let i = 0; i < allEvents.length; i++) {
			const fecha_inicio = moment(allEvents[i].fecha_inicio).format("YYYY-MM-DD HH:mm:ss");
			const fecha_termino = moment(allEvents[i].fecha_termino).format("YYYY-MM-DD HH:mm:ss");
			events.push({
				id: allEvents[i]._id,
				title: allEvents[i].nombre_cliente,
				start: fecha_inicio,
				end: fecha_termino,
				allDay: false,
				//otras cosas
				contacto: allEvents[i].numero_contacto_cliente,
				direccion: allEvents[i].direccion_cliente,
				monto_total: allEvents[i].monto_total,
				anticipo: allEvents[i].anticipo,
				carpa: allEvents[i].carpa, //nueva
				toldo: allEvents[i].toldo, //nueva
				calefaccion: allEvents[i].calefaccion, //nueva
				iluminacion: allEvents[i].Iluminacion, //nueva
				cubre_piso: allEvents[i].cubre_piso,
				metros_cuadrados: allEvents[i].metros_cuadrados,
				descripcion: allEvents[i].descripcion
			});
		}
		//todas las visitas
		for (let i = 0; i < allVisits.length; i++) {
			const fecha_inicio = moment(allVisits[i].fecha_hora_visita_terreno).format("YYYY-MM-DD HH:mm:ss");
			visits.push({
				id: allVisits[i]._id,
				title: allVisits[i].nombre_cliente,
				start: fecha_inicio,
				end: fecha_inicio,
				allDay: false,
				//otras cosas
				contacto: allVisits[i].numero_contacto_cliente,
				direccion: allVisits[i].direccion_cliente,
				descripcion: allVisits[i].descripcion
			});
		}



		//filtrar por inventario con notificacion true
		const reloadInventario = async () => {
			try{
				let res = await fetch("http://localhost:3000/api/Inventario", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				let inventario = await res.json();
				const filteredInventario = inventario.data.filter((item) => item.notificacion === true);
				setNotificacionInventario(filteredInventario);
			} catch (error) {
				console.log(error);
			}
		};

		

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
			window.location.href = "/";
		};

		

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
			window.location.href = "/";
		};

		

		const titleStyle = {
			fontSize: "1.5rem"
		};
		const parrafoStyle = {
			fontSize: "1.2rem"
		};

		return (
			<div>
				<Head>
					<title>Carpas Guajardo</title>
				</Head>
				<Container className="text-center cards-inicio">
					<Row className="justify-content-center">
						<Col xs={12} md={4} lg={4}>
							<Card bg="warning" text="white" className="mb-2 tarjeta-inicio">
								<Card.Body>
									<Card.Title style={titleStyle}>Eventos de hoy</Card.Title>
									<Card.Text style={parrafoStyle}>{eventos_hoy.length}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<Card bg="info" text="white" className="mb-2 tarjeta-inicio">
								<Card.Body>
									<Card.Title style={titleStyle}>Eventos del mes</Card.Title>
									<Card.Text style={parrafoStyle}> {eventos_mes}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<Card bg="success" text="white" className="mb-2 tarjeta-inicio">
								<Card.Body>
									<Card.Title style={titleStyle}>Ganancias del mes</Card.Title>
									<Card.Text style={parrafoStyle}>$ {ganancias}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
				<Container className="text-center mt-4 container-inicio">
					<Row className="justify-content-center">
						<Col md={6}>
							<h2>Eventos de hoy</h2>
							{eventos_hoy.length > 0 && (
								<Table responsive bordereless="true" variant="light">
									<thead>
										<tr key={0}>
											<th style={{ width: "40%" }}>Nombre</th>
											<th style={{ width: "10%" }}>Contacto</th>
											<th style={{ width: "80%" }}>Dirección</th>
										</tr>
									</thead>
									<tbody>
										{eventos_hoy.map((event, index) => (
											<tr key={index}>
												<td>{event.title}</td>
												<td>{event.contacto}</td>
												<td>{event.direccion}</td>
											</tr>
										))}
									</tbody>
								</Table>
							)}
							{eventos_hoy.length == 0 && <h6>No hay eventos</h6>}
						</Col>

						<Col md={6}>
							<h2>Visitas de hoy</h2>
							{visitas_hoy.length > 0 && (
								<Table responsive bordered variant="light">
									<thead>
										<tr key={0}>
											<th style={{ width: "15%" }}>Nombre</th>
											<th style={{ width: "15%" }}>Contacto</th>
											<th style={{ width: "15%" }}>Dirección</th>
										</tr>
									</thead>
									<tbody>
										{visitas_hoy.map((visit, index) => (
											<tr key={index}>
												<td>{visit.title}</td>
												<td>{visit.contacto}</td>
												<td>{visit.direccion}</td>
											</tr>
										))}
									</tbody>
								</Table>
							)}
							{visitas_hoy.length == 0 && <h6>No hay visitas</h6>}
						</Col>
					</Row>
				</Container>
				<Container className="text-center mt-4 container-inicio">
					<h2>Avisos</h2>
					<Row>
						<Col xs={12} lg={6} md={6}>
							<h4>Eventos</h4>
							<div className="event-scroll-container mb-4">
								{notificacion_eventos.map((event, index) => (
									<Card key={event._id} className="mb-4">
										<Card.Body className="text-left">
											<Card.Title className="mb-4 mt-2">Notificación {index + 1}</Card.Title>
											<Row>
												<Col xs={12} lg={6} md={6}>
													<div className="left-align">
														<Card.Text> Nombre cliente: {event.nombre_cliente}</Card.Text>
														<Card.Text> Fecha evento: {moment(event.fecha_inicio).format("DD-MM-YYYY")}</Card.Text>
														<Card.Text>Paso a estado {event.estado}</Card.Text>
													</div>
												</Col>
												<Col>
													<div className="vertical-center">
														<Button className="btn-info btn-sm" onClick={() => handleModShow(event._id)}>
															Marcar como leída
														</Button>
													</div>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								))}
								{notificacion_eventos.length == 0 && <h6>No hay notificaciones</h6>}
							</div>
						</Col>
						<Col xs={12} lg={6} md={6}>
							<h4>Inventario</h4>
							<div className="inventory-scroll-container mb-4">
								{notificacion_inventario.map((inventario, index) => (
									<Card key={inventario._id} className="mb-4">
										<Card.Body>
											<Row>
												<Card.Title className="mb-4 mt-2">Notificación {index + 1}</Card.Title>
											</Row>
											<Row>
												<Col xs={12} lg={8} md={8}>
													<div className="left-align">
														<Card.Text>Ítem: {inventario.nombre}</Card.Text>
														<Card.Text>Cantidad: {inventario.cantidad}</Card.Text>
														<Card.Text>Descripción: {inventario.estado}</Card.Text>
													</div>
												</Col>
												<Col xs={12} lg={4} md={4}>
													<div className="vertical-center">
														<Button className="btn-info btn-sm" onClick={() => handleModShow1(inventario._id)}>
															Marcar como leída
														</Button>
													</div>
												</Col>
											</Row>
										</Card.Body>
									</Card>
								))}
								{notificacion_inventario.length == 0 && <h6>No hay notificaciones</h6>}
							</div>
						</Col>
					</Row>
				</Container>
				<Container className="text-center carrusel">
					<Row className="justify-content-center">
						<Col xs={12} md={6} lg={4} className="d-flex align-items-center justify-content-center">
							<Image className="img-div" src="/images/logo.png" thumbnail />
						</Col>
						<Col xs={12} md={6} lg={4}>
							<div className="text-center">
								<Carousel>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto1.jpg" alt="" />
										<Carousel.Caption>
											<h3>Matrimonio</h3>
											<div>En Talagante, 01/23</div>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto2.jpg" alt="" />
										<Carousel.Caption>
											<h3>Graduación 4tos medios</h3>
											<div>En Santiago, 12/22.</div>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto3.jpg" alt="" />
										<Carousel.Caption>
											<h3>Celebración fiestas patrias</h3>
											<div>En Santiago, 09/22.</div>
										</Carousel.Caption>
									</Carousel.Item>
								</Carousel>
							</div>
						</Col>
					</Row>
				</Container>
				<Modal show={ModShow} onHide={handleModClose}>
					<Modal.Header closeButton>
						<Modal.Title>¿Estás seguro?</Modal.Title>
					</Modal.Header>
					<Modal.Body>Al marcar como leída la notificación esta no se volverá a mostrar.</Modal.Body>
					<Modal.Footer className="d-flex justify-content-center">
						<Button variant="success" onClick={handleProceso}>
							Aceptar
						</Button>
						<Button variant="danger" onClick={handleModClose}>
							Cancelar
						</Button>
					</Modal.Footer>
				</Modal>

				<Modal show={ModShow1} onHide={handleModClose1}>
					<Modal.Header closeButton>
						<Modal.Title>¿Estás seguro?</Modal.Title>
					</Modal.Header>
					<Modal.Body>Al marcar como leída la notificación esta no se volverá a mostrar. </Modal.Body>
					<Modal.Footer className="d-flex justify-content-center">
						<Button variant="success" onClick={handleFinalizado}>
							Aceptar
						</Button>
						<Button variant="danger" onClick={handleModClose1}>
							Cancelar
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	} else {
		// traer todos los eventos
		const events = [];
		const visits = [];

		//todos los eventos
		for (let i = 0; i < allEvents.length; i++) {
			const fecha_inicio = moment(allEvents[i].fecha_inicio).format("YYYY-MM-DD HH:mm:ss");
			const fecha_termino = moment(allEvents[i].fecha_termino).format("YYYY-MM-DD HH:mm:ss");
			events.push({
				id: allEvents[i]._id,
				title: allEvents[i].nombre_cliente,
				start: fecha_inicio,
				end: fecha_termino,
				allDay: false,
				//otras cosas
				contacto: allEvents[i].numero_contacto_cliente,
				direccion: allEvents[i].direccion_cliente,
				monto_total: allEvents[i].monto_total,
				anticipo: allEvents[i].anticipo,
				carpa: allEvents[i].carpa, //nueva
				toldo: allEvents[i].toldo, //nueva
				calefaccion: allEvents[i].calefaccion, //nueva
				iluminacion: allEvents[i].Iluminacion, //nueva
				cubre_piso: allEvents[i].cubre_piso,
				metros_cuadrados: allEvents[i].metros_cuadrados,
				descripcion: allEvents[i].descripcion
			});
		}
		//todas las visitas
		for (let i = 0; i < allVisits.length; i++) {
			const fecha_inicio = moment(allVisits[i].fecha_hora_visita_terreno).format("YYYY-MM-DD HH:mm:ss");
			visits.push({
				id: allVisits[i]._id,
				title: allVisits[i].nombre_cliente,
				start: fecha_inicio,
				end: fecha_inicio,
				allDay: false,
				//otras cosas
				contacto: allVisits[i].numero_contacto_cliente,
				direccion: allVisits[i].direccion_cliente,
				descripcion: allVisits[i].descripcion
			});
		}

		const filtrarEventosHoy = (fecha_hoy) => {
			// console.log(fecha_hoy);
			var resultado = events.filter((elemento) => {
				if (elemento.start.includes(fecha_hoy)) {
					return elemento;
				}
			});
			if (resultado.length > 0) {
				return resultado;
			} else {
				return [];
			}
		};

		const filtrarVisitasHoy = (fecha_hoy) => {
			// console.log(fecha_hoy);
			var resultado = visits.filter((elemento) => {
				if (elemento.start.includes(fecha_hoy)) {
					return elemento;
				}
			});
			if (resultado.length > 0) {
				return resultado;
			} else {
				return [];
			}
		};

		const eventos_hoy = filtrarEventosHoy(moment().format("YYYY-MM-DD"));
		const visitas_hoy = filtrarVisitasHoy(moment().format("YYYY-MM-DD"));
		// console.log(visitas_hoy);

		const titleStyle = {
			fontSize: "1.5rem"
		};
		const parrafoStyle = {
			fontSize: "1.2rem"
		};
		return (
			<div>
				<Head>
					<title>Carpas Guajardo</title>
				</Head>
				<Container className="text-center cards-inicio">
					<Row className="justify-content-center">
						<Col xs={12} md={4} lg={4}>
							<Card bg="warning" text="white" className="mb-2 tarjeta-inicio">
								<Card.Body>
									<Card.Title style={titleStyle}>Eventos de hoy</Card.Title>
									<Card.Text style={parrafoStyle}>{eventos_hoy.length}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={4} lg={4}>
							<Card bg="info" text="white" className="mb-2 tarjeta-inicio">
								<Card.Body>
									<Card.Title style={titleStyle}>Eventos del mes</Card.Title>
									<Card.Text style={parrafoStyle}> {eventos_mes}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
				<Container className="text-center mt-4 container-inicio">
					<Row className="justify-content-center">
						<Col md={6}>
							<h2>Eventos de hoy</h2>
							{eventos_hoy.length > 0 && (
								<Table responsive bordereless="true" variant="light">
									<thead>
										<tr key={0}>
											<th style={{ width: "40%" }}>Nombre</th>
											<th style={{ width: "10%" }}>Contacto</th>
											<th style={{ width: "80%" }}>Dirección</th>
										</tr>
									</thead>
									<tbody>
										{eventos_hoy.map((event, index) => (
											<tr key={index}>
												<td>{event.title}</td>
												<td>{event.contacto}</td>
												<td>{event.direccion}</td>
											</tr>
										))}
									</tbody>
								</Table>
							)}
							{eventos_hoy.length == 0 && <h6>No hay eventos</h6>}
						</Col>

						<Col md={6}>
							<h2>Visitas de hoy</h2>
							{visitas_hoy.length > 0 && (
								<Table responsive bordered variant="light">
									<thead>
										<tr key={0}>
											<th style={{ width: "15%" }}>Nombre</th>
											<th style={{ width: "15%" }}>Contacto</th>
											<th style={{ width: "15%" }}>Dirección</th>
										</tr>
									</thead>
									<tbody>
										{visitas_hoy.map((visit, index) => (
											<tr key={index}>
												<td>{visit.title}</td>
												<td>{visit.contacto}</td>
												<td>{visit.direccion}</td>
											</tr>
										))}
									</tbody>
								</Table>
							)}
							{visitas_hoy.length == 0 && <h6>No hay visitas</h6>}
						</Col>
					</Row>
				</Container>

				<Container className="text-center carrusel">
					<Row className="justify-content-center">
						<Col xs={12} md={6} lg={4} className="d-flex align-items-center justify-content-center">
							<Image className="img-div" src="/images/logo.png" thumbnail />
						</Col>
						<Col xs={12} md={6} lg={4}>
							<div className="text-center">
								<Carousel>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto1.jpg" alt="" />
										<Carousel.Caption>
											<h3>Matrimonio</h3>
											<div>En Talagante, 01/23</div>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto2.jpg" alt="" />
										<Carousel.Caption>
											<h3>Graduación 4tos medios</h3>
											<div>En Santiago, 12/22.</div>
										</Carousel.Caption>
									</Carousel.Item>
									<Carousel.Item interval={2000}>
										<img className="d-block w-100" src="/images/foto3.jpg" alt="" />
										<Carousel.Caption>
											<h3>Celebración fiestas patrias</h3>
											<div>En Santiago, 09/22.</div>
										</Carousel.Caption>
									</Carousel.Item>
								</Carousel>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export const getServerSideProps = withSession(async function ({ req, res }) {
	const token = req.session.get("token");

	let getAllEvents = await fetch("http://localhost:3000/api/eventos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let getVisits = await fetch("http://localhost:3000/api/visitas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let getEstadisticas = await fetch("http://localhost:3000/api/estadisticas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let allEstadistics = await getEstadisticas.json();
	let allVisits = await getVisits.json();
	let allEvents = await getAllEvents.json();
	if (token === undefined) {
		res.setHeader("location", "/login");
		res.statusCode = 302;
		res.end();
		return { props: { allEvents: allEvents.data, allVisits: allVisits.data, eventos_mes: allEstadistics.eventosMes, ganancias: allEstadistics.ganancias } };
	}

	return {
		props: { token: req.session.get("token"), allEvents: allEvents.data, allVisits: allVisits.data, eventos_mes: allEstadistics.eventosMes, ganancias: allEstadistics.ganancias }
	};
});
