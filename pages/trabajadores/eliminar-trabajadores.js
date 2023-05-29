import { Button, Modal } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import * as XLSX from "xlsx";

const Trabajador = (props) => {
	const [show, setShow] = useState(false);
	const [elementName, setElementName] = useState("");
	const [elementRole, setElementRole] = useState("");
	const { defaultTrabajadores } = props;
	const [trabajador, setTrabajadores] = useState(defaultTrabajadores);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [trabajadorIdToDelete, setTrabajadorIdToDelete] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAsc, setSortAsc] = useState(true);


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

	const filterTrabajador = () => {
		const filtered = trabajador.filter(
			(trabajador) =>
				trabajador.username
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				trabajador.rol
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				trabajador.nombre
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		);
		return filtered;
	};

	const handleSort = () => {
		setSortAsc(!sortAsc);
	};

	const filteredTrabajador = filterTrabajador();

	const sortedTrabajador = filteredTrabajador.sort((a, b) => {
		const dateA = moment(a.fecha_inicio);
		const dateB = moment(b.fecha_inicio);
		return sortAsc ? dateA - dateB : dateB - dateA;
	});

	const downloadExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(sortedTrabajador);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores");
		XLSX.writeFile(workbook, "trabajadores.xlsx");
	};


	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de trabajadores</h1>
			<div className="search-container">
				<h2>Búsqueda de trabajadores</h2>
				<div className="search-input">
					<input
						type="text"
						placeholder="Buscar por ussername, rol o nombre trabajador"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button className="excel" variant="success" onClick={downloadExcel}>
						Descargar Excel
					</Button>
				</div>
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
					{sortedTrabajador?.map((trabajador, index) => (
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Trabajador eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha eliminado a "{elementName}" con el rol de "{elementRole}" correctamente.</Modal.Body>
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
