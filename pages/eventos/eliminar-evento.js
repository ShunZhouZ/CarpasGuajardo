import { Button, Modal } from "react-bootstrap";//le agregue el modal
import { useCallback, useState } from "react";
import moment from 'moment';



const Eventos = (props) => {

	const [show, setShow] = useState(false);//esto es del modal
	//función para mostrar y ocultar el modal:
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { defaultEvents } = props
	const [events, setEvents] = useState(defaultEvents)

	const reloadEvents = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/eventos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _events = await res.json()
		setEvents(_events.data)
	}, [])

	const deleteElement = async (id) => {
		const deleteResponse = await fetch(`http://localhost:3000/api/eventos?id=${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})

		// Muestra el modal
		handleShow();

		console.log(await deleteResponse.json());
		await reloadEvents()
	}
	return (
		<div>
			<h1>Eliminar eventos</h1>
			<table className="table table-striped">
				<thead>
					<tr key={0}>
						<th style={{ width: "25%" }}>Titulo evento</th>
						<th style={{ width: "25%" }}>Inicio</th>
						<th style={{ width: "25%" }}>Fin</th>
						<th style={{ width: "25%" }}>Cliente</th>
					</tr>
				</thead>
				<tbody>
					{
						events?.map((event, index) => (
							<tr key={event._id}>
								<td>{event.title}</td>
								<td>{moment(event.start).format('DD/MM/YYYY hh:mm:ss')}</td>
								<td>{moment(event.end).format('DD/MM/YYYY hh:mm:ss')}</td>
								<td>{event.id_Cliente}</td>
								<td>
									<Button className="btn btn-danger" onClick={() => deleteElement(event._id)}>Eliminar</Button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
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
		</div>
	);
}

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