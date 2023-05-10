import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
	return (
		<Navbar className="mb-4" bg="primary" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Carpas Guajardo</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home">Inicio</Nav.Link>
						<NavDropdown title="Eventos" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="#action/3.1">Agendar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Modificar</NavDropdown.Item>
							<NavDropdown.Item href="/eventos/eliminar-evento">Eliminar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/eventos/visualizar-admin">Visualizar todos</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Visitas técnicas" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="#action/3.1">Agendar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Modificar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Eliminar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Visualizar todas</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Trabajadores" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="#action/3.1">Agregar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Modificar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Eliminar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Visualizar todos</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Contactos" id="basic-nav-dropdown" bg="primary" variant="dark">
							<NavDropdown.Item href="#action/3.1">Agregar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Modificar</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Eliminar</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Visualizar todos</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
					<NavDropdown title="Mark Otto" id="basic-nav-dropdown" bg="primary" variant="dark">
						<NavDropdown.Item href="#action/3.1">Mi perfil</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Cerrar sesión</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
