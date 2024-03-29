const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
const { useRouter } = require("next/router");
import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";

const Modificarinventarios = (props) => {
	const { inventarios } = props;
	const router = useRouter();
	const { id } = router.query;

	// Filtrar eventos por ID
	const inventario = inventarios.find((value) => value._id === id);
	// console.log(inventario)
	//const inventario = {}

	const [data, setData] = useState({
		_id: id,
		nombre: inventario.nombre,
		cantidad: inventario.cantidad,
		estado: inventario.estado,
		notificacion: true
	});

	const submitModificar = async (e) => {
		e.preventDefault();

		const response = await fetch("http://localhost:3000/api/Inventario", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		handleShow();
		// console.log(await response.json());
		// console.log("Modificar campo");
	};

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		window.location.href = "/vista-trabajador/inventario";
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
			<div className="custom-bg-color text-center w-sm-75 w-md-50 w-lg-35 p-5">
				<Form onSubmit={submitModificar}>
					<h1>Detalles de inventario</h1>

					<Form.Group>
						<Form.Label className="mt-3">Cantidad de {data.nombre}</Form.Label>
						<Form.Control type="number" onChange={handleControl} required defaultValue={data.cantidad} name="cantidad" id="cantidad" placeholder="cantidad" />
					</Form.Group>

					<Form.Group>
						<Form.Label className="mt-3">Detalles </Form.Label>
						<Form.Control as="textarea" onChange={handleControl} required defaultValue={data.estado} type="text" placeholder="estado" id="estado" name="estado" />
					</Form.Group>

					<div className="mt-4 text-center">
						<Button type="submit" className="btn btn-primary">
							Actualizar
						</Button>
					</div>
				</Form>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Ítem modificado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Actualizado y notificado correctamente.</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>Aceptar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps() {
	let response = await fetch("http://localhost:3000/api/Inventario", {
		method: "GET"
	});
	response = await response.json();

	//console.log(response);

	return {
		props: { inventarios: response.data }
	};
}
export default Modificarinventarios;
