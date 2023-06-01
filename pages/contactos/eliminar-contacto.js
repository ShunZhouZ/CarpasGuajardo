import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Contactos = (props) => {
	const [show, setShow] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [contactIdToDelete, setContactIdToDelete] = useState(null);
	const { defaultContacts } = props;
	const [contacts, setContacts] = useState(defaultContacts);
	const [busqueda, setBusqueda] = useState("");
	const [contactosFiltrado, setContacsFiltrado] = useState(contacts);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAsc, setSortAsc] = useState(true);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirmationClose = () => setShowConfirmation(false);

	const modifyElement = (id) => {
		window.location.href = `/eventos/modificar-contacts?id=${id}`;
	};

	const reloadContacts = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/contacts", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _contacts = await res.json();
		setContacts(_contacts.data);
	}, []);

	const deleteElement = (id) => {
		setContactIdToDelete(id);
		setShowConfirmation(true);
	};

	const confirmDelete = async () => {
		const deleteResponse = await fetch(`http://localhost:3000/api/contacts?id=${contactIdToDelete}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		handleShow();
		handleConfirmationClose();

		console.log(await deleteResponse.json());
		await reloadContacts();
	};

	const handleChange = (e) => {
		setBusqueda(e.target.value);
		console.log(e.target.value);
		filtrarBusqueda(e.target.value);
	};
	const filtrarBusqueda = (terminoBusqueda) => {
		console.log(terminoBusqueda);
		var resultado = contacts.filter((elemento) => {
			if (elemento.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
				return elemento;
			}
		});
		if (resultado.length > 0) {
			setContacsFiltrado(resultado);
		} else if (terminoBusqueda === "") {
			setContacsFiltrado(contacts);
		} else {
			setContacsFiltrado([]);
		}
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1 className="display-3 text-center mb-5">Lista de contactos</h1>
			<div className="containerInput">
				<input className="form-control inputBuscar" value={busqueda} placeholder="Búsqueda por nombre" onChange={handleChange} />
				<Button className="btn btn-primary">
					<FontAwesomeIcon icon={faSearch} />
				</Button>
			</div>
			<div className="card-container">
				{contactosFiltrado?.map((contact, index) => (
					<Card key={contact._id} className="mb-3">
						<Card.Body>
							<div className="row">
								<Row>
									<Card.Title className="modal-title">
										Contacto {index + 1}
									</Card.Title>

									<Col>
										<Card.Text>
											<strong>Nombre:</strong> {contact.nombre}
										</Card.Text>
										<Card.Text>
											<strong>Telefono:</strong> {contact.contacto}
										</Card.Text>
									</Col>

									<Col>
										<Card.Text>
											<strong>Correo:</strong> {contact.correo}
										</Card.Text>
										<Card.Text>
											<strong>Detalle:</strong> {contact.detalle}
										</Card.Text>
									</Col>
									<Col>
										
											<div className="button-group">
												<Button className="btn btn-info btn-sm" onClick={() => modifyElement(contact._id)}>
													<FontAwesomeIcon icon={faPencilAlt} /> Modificar
												</Button>
												
												<Button className="btn btn-danger btn-sm" onClick={() => deleteElement(contact._id)}>
													<FontAwesomeIcon icon={faTrash} /> Eliminar
												</Button>
											</div>
									</Col>
								</Row>
							</div>
							<br></br>
							<div className="button-group">

							</div>
						</Card.Body>
					</Card>
				))}
			</div>
			{contactosFiltrado.length == 0 && <h4>No hay resultados</h4>}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Contacto eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El contacto ha sido eliminado correctamente.</Modal.Body>
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
				<Modal.Body>¿Estás seguro de que deseas eliminar este contacto?</Modal.Body>
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
	let res = await fetch("http://localhost:3000/api/contacts", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let contacts = await res.json();
	return {
		props: { defaultContacts: contacts.data }
	};
}

export default Contactos;
