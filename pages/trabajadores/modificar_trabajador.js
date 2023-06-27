const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
const { useRouter } = require("next/router");
import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { userServiceFactory } from "../../clientServices/userService";
import useUser from "../../lib/useUser";
import { router } from "next/router";
import { FormGroup } from "react-bootstrap";


const Modificartrabajadores = (props) => {
	const { trabajadores } = props;
	const router = useRouter();
	const { id } = router.query;

	// Filtrar eventos por ID
	const trabajador = trabajadores.find((value) => value._id === id);
	//console.log(trabajador)
	//const trabajador = {}

	const [data, setData] = useState({
		_id: id,
		RUT: trabajador.username,
		nombre: trabajador.nombre,
		correo: trabajador.correo,
		contacto: trabajador.contacto
	});

	const submitModificar = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/api/trabajadores", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		handleShow();
		console.log(await response.json());
		console.log("Modificar campo");
	};

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		window.location.href = "/trabajadores/eliminar-trabajadores";
		};

	const handleControl = (e) => {
		e.preventDefault();
		const { value, name } = e.target;
		setData({
			...data,
			[name]: value
		});
	};
	const handleCheck = (e) => {
		const { checked, name } = e.target;
		setData({
			...data,
			[name]: checked
		});
	};
	return (
		<div className="d-flex justify-content-center">
			<div className="custom-bg-color  text-center w-sm-75 w-md-50 w-lg-25 p-5">
				
				<h1 className=" text-center mb-4">Modificar datos </h1>
					<Form onSubmit={submitModificar}>
							<Form.Group className="mb-3">
							
								<Form.Label className="mt-3">Nombre </Form.Label>
								<Form.Control
									onChange={handleControl} required defaultValue={data.nombre} type="text" placeholder="Nombre del trabajador" name="nombre"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="mt-3">Correo </Form.Label>
								<Form.Control
									onChange={handleControl} required defaultValue={data.correo} type="text" placeholder="correo" name="correo"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label className="mt-3">contacto </Form.Label>
								<Form.Control
									onChange={handleControl} required defaultValue={data.contacto} type="text" placeholder="contacto" name="contacto"
								/>
							</Form.Group>
						
						<div className="mt-4 text-center">
							<Button type="submit" className="btn btn-primary">
								Modificar
							</Button>
						</div>
					</Form>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Trabajador modificado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Datos del trabajador modificado correctamente.</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Aceptar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps() {
	let response = await fetch("http://localhost:3000/api/trabajadores", {
		method: "GET"
	});
	response = await response.json();

	//console.log(response);

	return {
		props: { trabajadores: response.data }
	};
}
export default Modificartrabajadores;
