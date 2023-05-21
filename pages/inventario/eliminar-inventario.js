import { Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');
import Table from "react-bootstrap/Table";

const Inventario = (props) => {
	const [show, setShow] = useState(false);
	const [elementName, setElementName] = useState("");
	const { defaultInventarios } = props;
	const [inventario, setInventarios] = useState(defaultInventarios);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const modifyElement = (id) => {
		window.location.href = `/eventos/modificar-inventario?id=${id}`;
	};

	const reloadInventarios = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/Inventario", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _inventario = await res.json();
		setInventarios(_inventario.data);
	}, []);

	const deleteElement = async (id, nombre) => {
		const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este contacto?");

		if (confirmDelete) {
			setElementName(nombre); // Guardar el nombre del elemento a eliminar
			const deleteResponse = await fetch(`http://localhost:3000/api/Inventario?id=${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			handleShow();

			console.log(await deleteResponse.json());
			await reloadInventarios();
		}
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de inventario</h1>
			<Table responsive striped bordered hover>
				<thead>
					<tr key={0}>
						<th style={{ width: "5%" }}>Nº</th>
						<th style={{ width: "47%" }}>Nombre</th>
						<th style={{ width: "47%" }}>Cantidad</th>
					</tr>
				</thead>
				<tbody>
					{inventario?.map((inventary, index) => (
						<tr key={inventary._id}>
							<td>{index + 1}</td>
							<td>{inventary.nombre}</td>
							<td>{inventary.cantidad}</td>
							<td>
								<div className="button-group">
									<Button className="btn btn-info">
										Modificar
									</Button>
									<Button className="btn btn-danger" onClick={() => deleteElement(inventary._id, inventary.nombre)}>
										Eliminar
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Elemento de inventario eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha eliminado "{elementName}" correctamente.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/Inventario", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let inventario = await res.json();
	return {
		props: { defaultInventarios: inventario.data }
	};
}

export default Inventario;
