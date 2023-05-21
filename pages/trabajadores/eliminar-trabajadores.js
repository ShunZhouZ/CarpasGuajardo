import { Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');
import Table from "react-bootstrap/Table";

const Trabajador = (props) => {
	const [show, setShow] = useState(false);
	const [elementName, setElementName] = useState("");
	const [elementRole, setElementRole] = useState("");
	const { defaultTrabajadores } = props;
	const [trabajador, setTrabajadores] = useState(defaultTrabajadores);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const modifyElement = (id) => {
		window.location.href = `/eventos/modificar-trabajadores?id=${id}`;
	};

	const reloadTrabajadores = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/trabajadores", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _trabajador = await res.json();
		setTrabajadores(_trabajador.data);
	}, []);

	const deleteElement = async (id, nombre, rol) => {
		const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este contacto?");

		if (confirmDelete) {
			setElementName(nombre); // Guardar el nombre del elemento a eliminar
			setElementRole(rol); // Guardar el rol del elemento a eliminar
			const deleteResponse = await fetch(`http://localhost:3000/api/trabajadores?id=${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			handleShow();

			console.log(await deleteResponse.json());
			await reloadTrabajadores();
		}
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de trabajadores</h1>
			<Table responsive striped bordered hover>
				<thead>
					<tr key={0}>
						<th style={{ width: "5%" }}>Nº</th>
						<th style={{ width: "30%" }}>Nombre de usuario</th>
						<th style={{ width: "30%" }}>Rol</th>
						<th style={{ width: "30%" }}>Nombre trabajador</th>
					</tr>
				</thead>
				<tbody>
					{trabajador?.map((trabajador, index) => (
						<tr key={trabajador._id}>
							<td>{index + 1}</td>
							<td>{trabajador.username}</td>
							<td>{trabajador.rol}</td>
							<td>{trabajador.nombre}</td>
							<td>
								<div className="button-group">
									<Button className="btn btn-info">
										Modificar
									</Button>
									<Button className="btn btn-danger" onClick={() => deleteElement(trabajador._id, trabajador.nombre, trabajador.rol)}>
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
					<Modal.Title>Elemento de trabajador eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha eliminado el trabajador "{elementName}" con el rol de "{elementRole}" correctamente.</Modal.Body>
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
	let res = await fetch("http://localhost:3000/api/trabajadores", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let trabajador = await res.json();
	return {
		props: { defaultTrabajadores: trabajador.data }
	};
}

export default Trabajador;
