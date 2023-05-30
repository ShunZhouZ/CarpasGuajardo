import Head from "next/head";
import withSession from "../lib/session";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
export default function Home({ user }) {
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

	if (user === undefined) {
		res.setHeader("location", "/login");
		res.statusCode = 302;
		res.end();
		return { props: {} };
	}

	return {
		props: { user: req.session.get("user") }
	};
});
