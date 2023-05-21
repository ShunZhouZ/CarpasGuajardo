const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
const { useRouter } = require("next/router");
import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";

const ModificarVisitas = (props) => {
	const { visitas } = props;
	const router = useRouter();
	const { id } = router.query;

	// Filtrar eventos por ID
	const visita = visitas.find((value) => value._id === id);
	//console.log(visita)
	//const visita = {}

	const [data, setData] = useState({
		_id: id,
		nombre_cliente: visita.nombre_cliente,
		numero_contacto_cliente: visita.numero_contacto_cliente,
		direccion_cliente: visita.direccion_cliente,
		descripcion: visita.descripcion,
		fecha_hora_visita_terreno: visita.fecha_hora_visita_terreno
	});

	const submitModificar = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/api/visitas", {
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
		window.location.href = "/visitas-tecnicas/eliminar-visita";
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
				<h1>Modificar visita a terreno</h1>
				<Form.Group>
					<Form.Label className="mt-3">Nombre Cliente </Form.Label>
					<Form.Control onChange={handleControl} required defaultValue={data.nombre_cliente} type="text" placeholder="Nombre del evento" name="nombre_cliente" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Numero de contacto </Form.Label>
					<Form.Control
						onChange={handleControl} required defaultValue={data.numero_contacto_cliente} type="text" placeholder="Numero del cliente" name="numero_contacto_cliente"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Direccion </Form.Label>
					<Form.Control
						onChange={handleControl} required defaultValue={data.direccion_cliente} type="text" placeholder="Direccion del cliente" name="direccion_cliente"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Fecha y hora de la visita </Form.Label>
					<Form.Control required
						onChange={handleControl}
						defaultValue={moment(data.fecha_hora_visita_terreno).format("yyyy-MM DD")}
						type="datetime-local"
						placeholder="Fecha y hora de visita"
						name="fecha_hora_visita_terreno" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Descripción </Form.Label>
					<Form.Control
						as="textarea" onChange={handleControl} required defaultValue={data.descripcion} type="text" placeholder="Descripcion" name="descripcion"
					/>
				</Form.Group>
				<div className="mt-3">
				<Button type="submit" className="btn btn-primary">
						Modificar
					</Button>
				</div>
			</Form>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Visita modificado</Modal.Title>
				</Modal.Header>
				<Modal.Body>La visita ha sido modificada correctamente.</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Aceptar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps() {
	let response = await fetch("http://localhost:3000/api/visitas", {
		method: "GET"
	});
	response = await response.json();

	//console.log(response);

	return {
		props: { visitas: response.data }
	};
}
export default ModificarVisitas;
