import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Table, Card, Image, Button, Form, Alert, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

function Perfil({ datos_usuarios }) {
	const [show, setShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showAlert2, setShowAlert2] = useState(false);
	const handleClose = () => {
		setShow(false);
		setShowAlert(false);
	};
	const handleShow = () => setShow(true);
	const [alertDuration, setAlertDuration] = useState(3000);

	const [datos, setDatos] = useState({});

	useEffect(() => {
		fetch("http://localhost:3000/api/contrasena", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.json())
			.then((respuesta) => {
				setDatos(respuesta.data[0]);
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		if (showAlert2) {
			const timer = setTimeout(() => {
				setShowAlert2(false);
			}, alertDuration);

			return () => clearTimeout(timer);
		}
	}, [showAlert2, alertDuration]);

	const guardarContraseña = (event) => {
		event.preventDefault();
		const nueva = event.target.nueva.value;
		const nueva_repetida = event.target.nueva_repetida.value;

		if (nueva !== nueva_repetida) {
			setShowAlert(true);
			return;
		}

		// call contraseña api sending session
		fetch("/api/contrasena", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ nueva })
		});

		setShowAlert2(true);

		handleClose();
	};

	return (
		<>
			<div className="container mx-auto px-10 mb-5">
				<h1 className="text-4xl my-8 mb-5">Mi perfil</h1>
				{showAlert2 && (
					<Alert variant="success" onClose={() => setShowAlert2(false)} dismissible show={showAlert2} className="alert-contraseña">
						<Alert.Heading>Cambio de contraseña correcto</Alert.Heading>
					</Alert>
				)}
				<Row>
					<Col xs={6} md={4} className="justify-content-center">
						<Image src="/images/perfil.png" thumbnail />

						<div className="text-center">
							<Button variant="primary">Cambiar foto</Button>
						</div>
					</Col>
					<Col xs={6} md={8}>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label className="">Nombre: </Form.Label>
								<Form.Control type="text" placeholder={datos.nombre} disabled />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label className="">Rut: </Form.Label>
								<Form.Control type="text" placeholder={datos.username} disabled />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label className="">Número de contacto: </Form.Label>
								<Form.Control type="text" placeholder={datos.contacto} disabled />
							</Form.Group>
						</Row>
						<Row>
							<Form.Group className="mb-3">
								<Form.Label className="">Correo electrónico: </Form.Label>
								<Form.Control type="text" placeholder={datos.correo} disabled />
							</Form.Group>
						</Row>
						<Row>
							<div className="mt-4">
								<Button variant="primary" onClick={handleShow}>
									Cambiar contraseña
								</Button>
							</div>
						</Row>
					</Col>
				</Row>
			</div>
			<Modal show={show} onHide={handleClose} className="modal-contraseña">
				<Modal.Header closeButton>
					<Modal.Title>Modificar contraseña</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible show={showAlert} className="alert-contraseña">
						<Alert.Heading>Las contraseñas no coinciden</Alert.Heading>
					</Alert>

					<Form id="cambio_contraseña" onSubmit={guardarContraseña} className="form-constraseña">
						<Form.Label>Nueva contraseña: </Form.Label>
						<Form.Control type="password" name="nueva" />
						<Form.Label>Repita contraseña: </Form.Label>
						<Form.Control type="password" name="nueva_repetida" />
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="success" type="submit" form="cambio_contraseña">
						Guardar contraseña
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Perfil;
