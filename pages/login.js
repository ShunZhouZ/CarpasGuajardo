import { useState } from "react";
import { userServiceFactory } from "../clientServices/userService";
import useUser from "../lib/useUser";
import { FormGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form, Col, Row } from "react-bootstrap";
import "../styles/login.module.css";

const userService = userServiceFactory();

export default function Login() {
	const { user, mutateUser } = useUser({
		redirectTo: "/",
		redirectIfFound: true
	});

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleConfirmationClose = () => setShowConfirmation(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			mutateUser(await userService.login(username, password));
		} catch (error) {
			setShowConfirmation(true);
			// alert(error.response.data.error);
		}
	};

	const usernameHandler = (e) => {
		setUsername(e.target.value);
	};

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div
			className="login-pagina"
			style={{
				backgroundImage: 'url("/images/carpa.jpeg")',
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center center",
				minHeight: "100vh",
				height: "auto",
				width: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.4)",
				backgroundBlendMode: "overlay",
				padding: "15vh 15vh"
			}}
		>
			{!user ? (
				<h1>Loading....</h1>
			) : (
				<>
					{!user.isLoggedIn && (
						<div>
							<Row>
								<Col xs={0} lg={8} md={4}></Col>
								<Col xs={12} lg={4} md={8}>
									<div className="input-login">
										<h1 className="text-center">Bienvenido a Carpas Guajardo</h1>
										<h3 className="text-center mt-5">Inicio de sesión</h3>

										<Form onSubmit={handleSubmit}>
											<FormGroup className="mb-3">
												<Form.Label className="mt-3" htmlFor="uname">
													Rut
												</Form.Label>
												<Form.Control type="text" placeholder="Ingrese su RUT" name="uname" required onChange={usernameHandler} />
											</FormGroup>
											<FormGroup className="mb-3">
												<Form.Label className="mt-3" htmlFor="psw">
													Contraseña
												</Form.Label>
												<Form.Control type="password" placeholder="Ingrese su contraseña" name="psw" required onChange={passwordHandler} />
											</FormGroup>
											<Row>
												<Col xs={12} lg={3} md={3} className="text-center">
													<Button variant="primary" type="submit">
														Entrar
													</Button>{" "}
												</Col>
												<Col xs={12} lg={9} md={9} className="align-items-center justify-content-center">
													<Button variant="link" href="./trabajadores/form-password">
														Recuperar contraseña
													</Button>
												</Col>
											</Row>
										</Form>
									</div>
								</Col>
							</Row>
							<Modal show={showConfirmation} onHide={handleConfirmationClose}>
								<Modal.Header closeButton>
									<Modal.Title>Error de autenticación</Modal.Title>
								</Modal.Header>
								<Modal.Body>Usuario o contraseña incorrecta</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleConfirmationClose}>
										Aceptar
									</Button>
								</Modal.Footer>
							</Modal>
						</div>
					)}
				</>
			)}
		</div>
	);
}
