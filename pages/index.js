import Head from "next/head";
import withSession from "../lib/session";
import { Container, Row, Col, Table } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment";

export default function Home({ user, allEvents }) {
	// traer todos los eventos
	const events = [];

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

	const filtrarBusqueda = (fecha_hoy) => {
		console.log(fecha_hoy);
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

	const eventos_hoy = filtrarBusqueda(moment().format("YYYY-MM-DD"));

	return (
		<div>
			<Head>
				<title>Carpas Guajardo</title>
			</Head>
			<h2>Bienvenido {user.username}!</h2>

			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={4}>
					<div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
						<div>
							<h4 className="fs-5">Eventos para hoy</h4>
							<p className="text-muted">Número</p>
						</div>
					</div>
				</Col>
				<Col xs={12} md={6} lg={4}>
					<div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
						<div>
							<h4 className="fs-5">Eventos realizados en el mes</h4>
							<p className="text-muted">Número</p>
						</div>
					</div>
				</Col>
				<Col xs={12} md={6} lg={4}>
					<div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
						<div>
							<h4 className="fs-5">Ganancias del mes</h4>
							<p className="text-muted">Número</p>
						</div>
					</div>
				</Col>
			</Row>

			<Container className="text-center mt-4">
				<Row className="justify-content-center">
					<Col md={6}>
						<h2>Eventos de hoy</h2>
						<Table responsive striped bordered hover>
							<thead>
								<tr key={0}>
									<th style={{ width: "15%" }}>Nombre</th>
									<th style={{ width: "15%" }}>Contacto</th>
									<th style={{ width: "15%" }}>Dirección</th>
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
					</Col>
					<Col md={6}>
						<h2>Visitas de hoy</h2>
					</Col>
				</Row>
			</Container>

			<Container className="text-center mt-4">
				<Row className="justify-content-center">
					<Col xs={12} md={6} lg={4}>
						<div className="text-center">
							<Carousel>
								<Carousel.Item interval={2000}>
									<img className="d-block w-100" src="/images/foto1.jpg" alt="" />
									<Carousel.Caption>
										<h3>Matrimonio</h3>
										<p>En Talagante, 01/23</p>
									</Carousel.Caption>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img className="d-block w-100" src="/images/foto2.jpg" alt="" />
									<Carousel.Caption>
										<h3>Graduación 4tos medios</h3>
										<p>En Santiago, 12/22.</p>
									</Carousel.Caption>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img className="d-block w-100" src="/images/foto3.jpg" alt="" />
									<Carousel.Caption>
										<h3>Celebración fiestas patrias</h3>
										<p>En Santiago, 09/22.</p>
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

export const getServerSideProps = withSession(async function ({ req, res }) {
	const user = req.session.get("user");

	let getAllEvents = await fetch("http://localhost:3000/api/eventos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let allEvents = await getAllEvents.json();
	if (user === undefined) {
		res.setHeader("location", "/login");
		res.statusCode = 302;
		res.end();
		return { props: { allEvents: allEvents.data } };
	}

	return {
		props: { user: req.session.get("user"), allEvents: allEvents.data }
	};
});
