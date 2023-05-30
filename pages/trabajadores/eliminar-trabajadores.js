import { Button, Modal } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Trabajador = (props) => {
	const [show, setShow] = useState(false);
	const [elementName, setElementName] = useState("");
	const [elementRole, setElementRole] = useState("");
	const { defaultTrabajadores } = props;
	const [trabajadores, setTrabajadores] = useState(defaultTrabajadores);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [trabajadorIdToDelete, setTrabajadorIdToDelete] = useState(null);
	const [busqueda, setBusqueda] = useState("");
	const [trabajadoresFiltrado, setTrabajadoresFiltrado] = useState(trabajadores);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirmationClose = () => setShowConfirmation(false);

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
		setTrabajadorIdToDelete(id);
		setElementName(nombre);
		setElementRole(rol);
		setShowConfirmation(true);
	};

	const confirmDelete = async () => {
		const deleteResponse = await fetch(`http://localhost:3000/api/trabajadores?id=${trabajadorIdToDelete}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		handleShow();
		handleConfirmationClose();

		console.log(await deleteResponse.json());
		await reloadTrabajadores();
	};

	const handleChange = (e) => {
		setBusqueda(e.target.value);
		console.log(e.target.value);
		filtrarBusqueda(e.target.value);
	};
	const filtrarBusqueda = (terminoBusqueda) => {
		console.log(terminoBusqueda);
		var resultado = trabajadores.filter((elemento) => {
			if (elemento.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
				return elemento;
			}
		});
		if (resultado.length > 0) {
			setTrabajadoresFiltrado(resultado);
		} else if (terminoBusqueda === "") {
			setTrabajadoresFiltrado(trabajadores);
		} else {
			setTrabajadoresFiltrado([]);
		}
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de trabajadores</h1>
			<div className="containerInput">
				<input className="form-control inputBuscar" value={busqueda} placeholder="Búsqueda por nombre" onChange={handleChange} />
				<Button className="btn btn-primary">
					<FontAwesomeIcon icon={faSearch} />
				</Button>
			</div>
			<Table responsive striped bordered hover>
				<thead>
					<tr key={0}>
						<th style={{ width: "5%" }}>Nº</th>
						<th style={{ width: "15%" }}>Nombre de usuario</th>
						<th style={{ width: "15%" }}>Rol</th>
						<th style={{ width: "15%" }}>Nombre trabajador</th>
						<th style={{ width: "3%" }}>Acciones</th>
					</tr>
				</thead>

				<tbody>
					{trabajadoresFiltrado?.map((trabajador, index) => (
						<tr key={trabajador._id}>
							<td>{index + 1}</td>
							<td>{trabajador.username}</td>
							<td>{trabajador.rol}</td>
							<td>{trabajador.nombre}</td>
							<td>
								<div className="button-group">
									<Button className="btn btn-info " onClick={() => modifyElement(trabajador._id)}>
										<FontAwesomeIcon icon={faPencilAlt} /> Modificar
									</Button>
									<Button className="btn btn-danger" onClick={() => deleteElement(trabajador._id, trabajador.nombre, trabajador.rol)}>
										<FontAwesomeIcon icon={faTrash} /> Eliminar
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{trabajadoresFiltrado.length == 0 && <h4>No hay resultados</h4>}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Trabajador eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Se ha eliminado a "{elementName}" con el rol de "{elementRole}" correctamente.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showConfirmation} onHide={handleConfirmationClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmación de eliminación</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Estás seguro de que deseas eliminar a "{elementName}"?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleConfirmationClose}>
						Cancelar
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Eliminar
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
