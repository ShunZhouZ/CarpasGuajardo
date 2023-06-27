import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import useUser from "../lib/useUser";

import React from "react";

//eliminar si no os gusta el image, linea 13 al 19 y agregar Carpas Guajardo
const NavBar = (res, req) => {
	const { user, mutateUser } = useUser({
		redirectIfFound: true
	});
	if (!user) return <div>Cargando...</div>;
	else if (user.rol === "administrador") {
		return (
			<>
				{user.isLoggedIn && (
					<Navbar className="mb-4" bg="primary" variant="dark" expand="lg">
						<Container>
							{/* corregir por nombre real de la pagina */}
							<Navbar.Brand href="#home">
								<div style={{ textAlign: "center" }}>
									Carpas Guajardo
									<br />
									<span style={{ fontSize: "smaller" }}>MODO ADMIN</span>
								</div>
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<Nav.Link href="/">Inicio</Nav.Link>
									<NavDropdown title="Eventos" id="basic-nav-dropdown" bg="primary" variant="dark">
										<NavDropdown.Item href="/eventos/agendar-evento">Agendar</NavDropdown.Item>
										<NavDropdown.Item href="/eventos/eliminar-evento">Lista de eventos</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/eventos/visualizar-admin">Visualizar calendario</NavDropdown.Item>
										<NavDropdown.Item href="/notificaciones/notificacion">Notificaciones</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Visitas técnicas" id="basic-nav-dropdown" bg="primary" variant="dark">
										<NavDropdown.Item href="/visitas-tecnicas/agendar-visita">Agendar</NavDropdown.Item>
										<NavDropdown.Item href="/visitas-tecnicas/eliminar-visita">Lista de visitas</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/visitas-tecnicas/visualizar-visitas-admin">Visualizar calendario</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Trabajadores" id="basic-nav-dropdown" bg="primary" variant="dark">
										<NavDropdown.Item href="/trabajadores/add-worker">Agregar</NavDropdown.Item>
										<NavDropdown.Item href="/trabajadores/eliminar-trabajadores">Lista de trabajadores</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Contactos" id="basic-nav-dropdown" bg="primary" variant="dark">
										<NavDropdown.Item href="/contactos/agregar-contacto">Agregar</NavDropdown.Item>
										<NavDropdown.Item href="/contactos/eliminar-contacto">Lista de contactos</NavDropdown.Item>
									</NavDropdown>
									<NavDropdown title="Inventario" id="basic-nav-dropdown" bg="primary" variant="dark">
										<NavDropdown.Item href="/inventario/agregar-inventario">Agregar</NavDropdown.Item>
										<NavDropdown.Item href="/inventario/eliminar-inventario">Lista de inventario</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/notificaciones/notificacion">Notificaciones</NavDropdown.Item>
									</NavDropdown>
									<Nav.Link href="/">Notificaciones</Nav.Link>
								</Nav>
							</Navbar.Collapse>
							<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
								<NavDropdown title={user.username} id="basic-nav-dropdown" bg="primary" variant="dark">
									<NavDropdown.Item href="/perfil">Mi perfil</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/api/logout">Cerrar sesión</NavDropdown.Item>
								</NavDropdown>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				)}
			</>
		);
	}
	return (
		<>
			{user.isLoggedIn && user.rol === "trabajador" && (
				<Navbar className="mb-4" bg="primary" variant="dark" expand="lg">
					<Container>
						<Navbar.Brand href="#home">Carpas Guajardo</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="/">Inicio</Nav.Link>
								<NavDropdown title="Eventos" id="basic-nav-dropdown" bg="primary" variant="dark">
									<NavDropdown.Item href="/vista-trabajador/eventos">Lista de eventos</NavDropdown.Item>
									<NavDropdown.Item href="/vista-trabajador/visualizar-eventos-trabajador">Visualizar calendario</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title="Visitas técnicas" id="basic-nav-dropdown" bg="primary" variant="dark">
									<NavDropdown.Item href="/vista-trabajador/eliminar-visita">Lista de visitas</NavDropdown.Item>
									<NavDropdown.Item href="/vista-trabajador/visualizar-visitas-trabajador">Visualizar calendario</NavDropdown.Item>
								</NavDropdown>
								<Nav.Link href="/vista-trabajador/inventario">Inventario</Nav.Link>
							</Nav>
						</Navbar.Collapse>
						<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
							<NavDropdown title={user.nombre} id="basic-nav-dropdown" bg="primary" variant="dark">
								<NavDropdown.Item href="/perfil">Mi perfil</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="/api/logout">Cerrar sesión</NavDropdown.Item>
							</NavDropdown>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>
	);
};

export default NavBar;
