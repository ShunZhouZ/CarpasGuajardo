import { Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from 'moment';

const Eventos = (props) => {
	const [show, setShow] = useState(false);
	const [clientes, setClientes] = useState([]);
	const { defaultEvents } = props;
	const [events, setEvents] = useState(defaultEvents);

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

	const loadClientes = useCallback(async () => {
		let res = await fetch("http://localhost:3000/api/clientes", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		let _clientes = await res.json();
		setClientes(_clientes.data);
	}, []);

	const getClientName = (id) => {
		const cliente = clientes.find((c) => c._id === id);
		return cliente ? `${cliente.nombre} ${cliente.apellido}` : '-';
	};

	const deleteElement = async (id) => {
		const deleteResponse = await fetch(`http://localhost:3000/api/eventos?id=${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});

		handleShow();

		console.log(await deleteResponse.json());
		await reloadEvents();
	};

	useEffect(() => {
		loadClientes();
	}, []);

	return (
		<div>
			<h1>Eliminar eventos</h1>
			<table className="table table-striped">
				<thead>
					<tr key={0}>
						<th style={{ width: "10%" }}>Nº</th>
						<th style={{ width: "10%" }}>Nombre cliente</th>
						<th style={{ width: "10%" }}>Contacto cliente</th>
						<th style={{ width: "10%" }}>Direccion</th>
						<th style={{ width: "10%" }}>inicio</th>
						<th style={{ width: "10%" }}>fin</th>
						<th style={{ width: "10%" }}>Monto total</th>
						<th style={{ width: "10%" }}>Anticipo</th>
						<th style={{ width: "10%" }}>Metros cuadrados</th>
					</tr>
				</thead>
				<tbody>
					{events?.map((event, index) => (
						<tr key={event._id}>
							<td>{index + 1}</td>
							<td>{event.nombre_cliente}</td>
							<td>{event.numero_contacto_cliente}</td>
							<td>{event.direccion_cliente}</td>
							<td>{moment(event.fecha_inicio).format('DD/MM/YYYY hh:mm:ss')}</td>
							<td>{moment(event.fecha_termino).format('DD/MM/YYYY hh:mm:ss')}</td>
							<td>{event.monto_total}</td>
							<td>{event.anticipo}</td>
							<td>{event.metros_cuadrados}</td>
							
							<td>
								<div className="button-group">
									<Button className="btn btn-danger" onClick={() => deleteElement(event._id)}>Eliminar</Button>
									<Button className="btn btn-primary" onClick={() => modifyElement(event._id)}>Modificar</Button>
								</div>
							</td>
						</tr>
					))}
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
