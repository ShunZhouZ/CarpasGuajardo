import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import React from "react";

//eliminar si no os gusta el image, linea 13 al 19 y agregar Carpas Guajardo
const NavBar = () => {
	return (
		<Navbar className="mb-4" bg="primary" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home"> Carpas Guajardo</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home">Inicio</Nav.Link>
						<NavDropdown title="Eventos" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="/eventos/agendar-evento">Agendar</NavDropdown.Item>
							<NavDropdown.Item href="/eventos/eliminar-evento">Lista de eventos</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/eventos/visualizar-admin">Visualizar calendario</NavDropdown.Item>
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
							<NavDropdown.Item href="#action/3.1">Agregar</NavDropdown.Item>
							<NavDropdown.Item href="/contactos/eliminar-contacto">Lista de contactos</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Inventario" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="#action/3.1">Agregar</NavDropdown.Item>
							<NavDropdown.Item href="/inventario/eliminar-inventario">Lista de inventario</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
					<NavDropdown title="ADMINISTRADOR" id="basic-nav-dropdown" bg="primary" variant="dark">
						<NavDropdown.Item href="#action/3.1">Mi perfil</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="/api/logout">Cerrar sesión</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
