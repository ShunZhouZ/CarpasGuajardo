import { Button, Modal, Table } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');
const Visitas = (props) => {
	const { defaultVisits } = props;
	const [visits, setVisits] = useState(defaultVisits);

	const [showModal, setShowModal] = useState(false); // agregamos un estado para el modal

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

	const deleteElement = async (id) => {
		const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta visita?");

		if (confirmDelete) {
			const deleteResponse = await fetch(`http://localhost:3000/api/visitas?id=${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			// mostramos el modal cuando se ha eliminado correctamente la visita
			setShowModal(true);
			console.log(await deleteResponse.json());
			await reloadVisits();
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div style={{ marginLeft: "40px", marginRight: "40px" }}>
			<h1>Lista de visitas</h1>
			<Table responsive striped bordered hover>
				<thead>
					<tr key={0}>
						<th style={{ width: "5%" }}>Nº</th>
						<th style={{ width: "15%" }}>Nombre cliente</th>
						<th style={{ width: "15%" }}>Contacto</th>
						<th style={{ width: "15%" }}>Direccion</th>
						<th style={{ width: "15%" }}>Fecha visita</th>
						<th style={{ width: "20%", textAlign: "center" }}>Realizacion</th>
					</tr>
				</thead>
				<tbody>
					{visits?.map((visit, index) => (
						<tr key={visit._id}>
							<td>{index + 1}</td>
							<td>{visit.nombre_cliente}</td>
							<td>{visit.numero_contacto_cliente}</td>
							<td>{visit.direccion_cliente}</td>
							<td className={moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").isBefore(moment(), "minute") ? "text-danger" : ""}>
								{moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").format("dddd DD-MM-YYYY, HH:mm")}
							</td>
							<td className={`text-center ${moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").isBefore(moment(), "minute") ? "text-danger" : ""}`}>
								{moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").startOf("minute").fromNow()}
							</td>

							<td>
								<div className="button-group">
									<Button className="btn btn-info" onClick={() => modifyElement(visit._id)}>
										Modificar
									</Button>
									<Button className="btn btn-danger" onClick={() => deleteElement(visit._id)}>
										Eliminar
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{/* modal para mostrar mensaje de eliminación exitosa */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Visita eliminada</Modal.Title>
				</Modal.Header>
				<Modal.Body>La visita ha sido eliminada correctamente.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
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