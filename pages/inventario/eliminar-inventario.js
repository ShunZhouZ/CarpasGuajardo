import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
moment.locale("es");

const Inventario = (props) => {
	const [show, setShow] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [elementName, setElementName] = useState("");
	const [elementIdToDelete, setElementIdToDelete] = useState(null);
	const { defaultInventarios } = props;
	const [inventario, setInventarios] = useState(defaultInventarios);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleConfirmationClose = () => setShowConfirmation(false);

	const modifyElement = (id) => {
		window.location.href = `/inventario/modificar-inventario?id=${id}`;
	};

	const deleteElement = async (id, nombre) => {
		setElementName(nombre);
		setElementIdToDelete(id);
		setShowConfirmation(true);
	};

	const confirmDelete = async () => {
		const deleteResponse = await fetch(`http://localhost:3000/api/Inventario?id=${elementIdToDelete}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		handleShow();
		handleConfirmationClose();

		// console.log(await deleteResponse.json());
		// await reloadInventarios();
	};

	return (
		<div style={{ marginLeft: "60px", marginRight: "60px" }}>
			<h1 className="display-3 text-center mb-5">Lista de inventario</h1>
			<div className="card-container">
				<Row className="g-4">
					{inventario?.map((inventary, index) => (
						<Col key={inventary._id} lg={4} sm={12} md={6}>
							<Card className="mb-3">
								<Card.Body>
									<Card.Title className="mb-3">
										<h3>Ítem {index + 1}</h3>
									</Card.Title>
									<Row>
										<Col lg={5} sm={5} md={5}>
											<Card.Text>Nombre: {inventary.nombre}</Card.Text>
											<Card.Text>Cantidad: {inventary.cantidad}</Card.Text>
										</Col>
										<Col lg={7} sm={7} md={7}>
											<Card.Text>Descripción: {inventary.estado}</Card.Text>
										</Col>
									</Row>
									<Row>
										<div className="mt-2 text-center">
											<Button className="btn btn-info btn-sm me-2" onClick={() => modifyElement(inventary._id)}>
												<FontAwesomeIcon icon={faPencilAlt} /> Modificar
											</Button>
											<Button className="btn btn-danger btn-sm" onClick={() => deleteElement(inventary._id)}>
												<FontAwesomeIcon icon={faTrash} /> Eliminar
											</Button>
										</div>
									</Row>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Elemento de inventario eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>Se ha eliminado correctamente.</Modal.Body>
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
				<Modal.Body>¿Estás seguro de que deseas eliminar el elemento?</Modal.Body>
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
