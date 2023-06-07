const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
const { useRouter } = require("next/router");
import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";

const Modificarcontactos = (props) => {
	const { contactos } = props;
	const router = useRouter();
	const { id } = router.query;

	// Filtrar eventos por ID
	const contacto = contactos.find((value) => value._id === id);
	//console.log(contacto)
	//const contacto = {}

	const [data, setData] = useState({
		_id: id,
		nombre_cliente: contacto.nombre_cliente,
		numero_contacto_cliente: contacto.numero_contacto_cliente,
		direccion_cliente: contacto.direccion_cliente,
		correo: contacto.correo,
		descripcion: contacto.descripcion
	});

	const submitModificar = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/api/contacts", {
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
		window.location.href = "/contactos/eliminar-contacto";
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
			<Form className="mx-5 w-25" onSubmit={submitModificar}>
				<h1>Modificar datos de contacto</h1>
				<Form.Group>
					<Form.Label className="mt-3">Nombre </Form.Label>
					<Form.Control onChange={handleControl} required defaultValue={data.nombre_cliente} type="text" placeholder="Nombre" name="nombre_cliente" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Numero de contacto </Form.Label>
					<Form.Control
						onChange={handleControl} required defaultValue={data.numero_contacto_cliente} type="text" placeholder="Contacto" name="numero_contacto_cliente"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Direccion </Form.Label>
					<Form.Control
						onChange={handleControl} required defaultValue={data.direccion_cliente} type="text" placeholder="Direccion" name="direccion_cliente"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Correo </Form.Label>
					<Form.Control
						onChange={handleControl} required defaultValue={data.correo} type="text" placeholder="Correo" name="correo"
					/>
				</Form.Group>
				
				<Form.Group>
					<Form.Label className="mt-3">Detalles </Form.Label>
					<Form.Control
						as="textarea" onChange={handleControl} required defaultValue={data.descripcion} type="text" placeholder="Detalle" name="descripcion"
					/>
				</Form.Group>
				<div className="mt-4 text-center">
				<Button type="submit" className="btn btn-primary">
						Modificar
					</Button>
				</div>
			</Form>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>contacto modificado</Modal.Title>
				</Modal.Header>
				<Modal.Body>La contacto ha sido modificada correctamente.</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Aceptar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps() {
	let response = await fetch("http://localhost:3000/api/contacts", {
		method: "GET"
	});
	response = await response.json();

	//console.log(response);

	return {
		props: { contactos: response.data }
	};
}
export default Modificarcontactos;
