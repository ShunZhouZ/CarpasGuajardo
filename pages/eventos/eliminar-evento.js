import { Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";

const Eventos = (props) => {
	const [show, setShow] = useState(false);
	const { defaultEvents } = props;
	const [events, setEvents] = useState(defaultEvents);

	const [description, setDescription] = useState(""); //descripcion
	const [showDescriptionModal, setShowDescriptionModal] = useState(false);

	const handleShowDescriptionModal = (description) => {
		setDescription(description);
		setShowDescriptionModal(true);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const modifyElement = (id) => {
		window.location.href = `/eventos/modificar-evento?id=${id}`;
	};

	const reloadEvents = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/eventos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _events = await res.json();
		setEvents(_events.data);
	}, []);

	const deleteElement = async (id) => {
		const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este evento?");

		if (confirmDelete) {
			const deleteResponse = await fetch(`http://localhost:3000/api/eventos?id=${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			handleShow();

			console.log(await deleteResponse.json());
			await reloadEvents();
		}
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de eventos</h1>
			<Table responsive striped bordered hover>
				<thead>
					<tr key={0}>
						<th style={{ width: "2%" }}>Nº</th>
						<th style={{ width: "10%" }}>Nombre</th>
						<th style={{ width: "7%" }}>Teléfono</th>
						<th style={{ width: "10%" }}>Dirección</th>
						<th style={{ width: "10%" }}>Inicio evento</th>
						<th style={{ width: "10%" }}>Fin evento</th>
						<th style={{ width: "5%" }}>
							m<sup>2</sup>
						</th>
						<th style={{ width: "7%" }}>Cubrepiso</th>
						<th style={{ width: "7%" }}>Carpa</th>
						<th style={{ width: "7%" }}>Toldo</th>
						<th style={{ width: "7%" }}>Iluminación</th>
						<th style={{ width: "7%" }}>Calefacción</th>
						<th style={{ width: "7%" }}>Monto total</th>
						<th style={{ width: "5%" }}>Abono</th>
						<th style={{ width: "5%" }}>Descripción</th>
						<th style={{ width: "5%" }}>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{events?.map((event, index) => (
						<tr key={event._id}>
							<td>{index + 1}</td>
							<td>{event.nombre_cliente}</td>
							<td>{event.numero_contacto_cliente}</td>
							<td>{event.direccion_cliente}</td>
							<td>{moment(event.fecha_inicio).format("dddd DD-MM-YYYY  HH:mm")}</td>
							<td>{moment(event.fecha_termino).format("dddd DD-MM-YYYY  HH:mm")}</td>
							<td style={{ textAlign: "center" }}>{event.metros_cuadrados}</td>
							<td>{event.cubre_piso ? "Sí" : "No"}</td>
							<td>{event.carpa ? "Sí" : "No"}</td>
							<td>{event.toldo ? "Sí" : "No"}</td>
							<td>{event.Iluminacion ? "Sí" : "No"}</td>
							<td>{event.calefaccion ? "Sí" : "No"}</td>
							<td>{event.monto_total}</td>
							<td>{event.anticipo}</td>
							<td>
								<Button className="btn btn-light" onClick={() => handleShowDescriptionModal(event.descripcion)}>
									Visualizar
								</Button>
							</td>
							<td>
								<div className="button-group">
									<Button className="btn btn-info" onClick={() => modifyElement(event._id)}>
										Modificar
									</Button>
									<Button className="btn btn-danger" onClick={() => deleteElement(event._id)}>
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
					<Modal.Title>Evento eliminado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El evento ha sido eliminado correctamente.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showDescriptionModal} onHide={() => setShowDescriptionModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Descripción del evento</Modal.Title>
				</Modal.Header>
				<Modal.Body>{description}</Modal.Body>
			</Modal>
		</div>
	);
};
export async function getServerSideProps(context) {
	let res = await fetch("http://localhost:3000/api/eventos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	let events = await res.json();
	return {
		props: { defaultEvents: events.data }
	};
}

export default Eventos;
