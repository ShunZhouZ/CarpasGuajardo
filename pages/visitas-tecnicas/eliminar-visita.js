import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Visitas = (props) => {
	const { defaultVisits } = props;
	const [visits, setVisits] = useState(defaultVisits);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [visitIdToDelete, setVisitIdToDelete] = useState(null);
	const [visitIdToShowDescription, setVisitIdToShowDescription] = useState(null); // Nuevo estado para almacenar el ID de la visita a mostrar
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAsc, setSortAsc] = useState(true);

	const reloadVisits = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/visitas", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _visits = await res.json();
		setVisits(_visits.data);
	}, []);

	const modifyElement = (id) => {
		window.location.href = `/visitas-tecnicas/modificar-visita?id=${id}`;
	};

	const deleteElement = (id) => {
		setVisitIdToDelete(id);
		setShowDeleteModal(true);
	};

	const confirmDelete = async () => {
		const deleteResponse = await fetch(`http://localhost:3000/api/visitas?id=${visitIdToDelete}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		setShowDeleteModal(false);
		setShowSuccessModal(true);
		// console.log(await deleteResponse.json());
		await reloadVisits();
	};

	const showDescription = (id) => {
		setVisitIdToShowDescription(id);
	};

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(false);
	};

	const filterVisits = () => {
		const filtered = visits.filter(
			(visit) =>
				visit.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
				visit.direccion_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
				visit.numero_contacto_cliente.toLowerCase().includes(searchTerm.toLowerCase())
		);
		return filtered;
	};

	const handleSort = () => {
		setSortAsc(!sortAsc);
	};

	const filteredVisits = filterVisits();

	const sortedVisits = filteredVisits.sort((a, b) => {
		const dateA = moment(a.fecha_inicio);
		const dateB = moment(b.fecha_inicio);
		return sortAsc ? dateA - dateB : dateB - dateA;
	});

	const downloadExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(sortedVisits);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Visitas");
		XLSX.writeFile(workbook, "visitas.xlsx");
	};

	return (
		<div style={{ marginLeft: "60px", marginRight: "60px" }}>
			<h1 className="display-3 text-center mb-5">Lista de visitas</h1>
			{/* <div className="search-container">
        <h2>Búsqueda de visitas</h2>
        <div className="search-input">
          <input
            type="text"
            placeholder="Buscar por nombre, dirección o telefono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="excel" variant="success" onClick={downloadExcel}>
            Descargar Excel
          </Button>
        </div>
      </div> */}
			<div className="card-container">
				{sortedVisits?.map((visit, index) => (
					<Card key={visit._id}>
						<Card.Body>
							<div className="row">
								<Row>
									<Card.Title className="modal-title mb-3">Visita {index + 1}</Card.Title>
									<Col>
										<Card.Text>
											<strong>Nombre:</strong> {visit.nombre_cliente}
										</Card.Text>
										<Card.Text>
											<strong>Número de contacto: </strong> {visit.numero_contacto_cliente}
										</Card.Text>
										<Card.Text>
											<strong>Dirección: </strong> {visit.direccion_cliente}
										</Card.Text>
									</Col>

									<Col>
										<Card.Text>
											<strong>Fecha: </strong>
											<span className={moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD").isBefore(moment(), "minute") ? "text-danger" : ""}>
												{moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD").format("DD-MM-YYYY")}
											</span>
										</Card.Text>
										<Card.Text>
											<strong>Hora: </strong>
											<span className={`text-center ${moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").isBefore(moment(), "minute") ? "text-danger" : ""}`}>
												{moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}
											</span>
										</Card.Text>
									</Col>

									<Col>
										<Card.Text>
											<Button className="btn btn-warning btn-sm" onClick={() => showDescription(visit._id)}>
												<FontAwesomeIcon icon={faEye} />
												Descripción
											</Button>
										</Card.Text>
										<Card.Text>
											<Button className="btn btn-info btn-sm" onClick={() => modifyElement(visit._id)}>
												<FontAwesomeIcon icon={faPencilAlt} /> Modificar
											</Button>
										</Card.Text>
										<Card.Text>
											<Button className="btn btn-danger btn-sm" onClick={() => deleteElement(visit._id)}>
												<FontAwesomeIcon icon={faTrash} /> Eliminar
											</Button>
										</Card.Text>
									</Col>
								</Row>
							</div>
						</Card.Body>
					</Card>
				))}
			</div>
			<Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmación de eliminación</Modal.Title>
				</Modal.Header>
				<Modal.Body>¿Estás seguro de que deseas eliminar esta visita?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseDeleteModal}>
						Cancelar
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
				<Modal.Header closeButton>
					<Modal.Title>Visita eliminada</Modal.Title>
				</Modal.Header>
				<Modal.Body>La visita ha sido eliminada correctamente.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSuccessModal}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={visitIdToShowDescription !== null} onHide={() => setVisitIdToShowDescription(null)}>
				{" "}
				{/* Modal para mostrar la descripción */}
				<Modal.Header closeButton>
					<Modal.Title>Descripción</Modal.Title>
				</Modal.Header>
				<Modal.Body>{visits.find((visit) => visit._id === visitIdToShowDescription)?.descripcion}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setVisitIdToShowDescription(null)}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/visitas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let visits = await res.json();
	return {
		props: { defaultVisits: visits.data }
	};
}

export default Visitas;
