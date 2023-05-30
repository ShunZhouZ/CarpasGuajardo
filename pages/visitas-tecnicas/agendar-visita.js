import { useState } from "react";
import axios from "axios";
import { router } from "next/router";
const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
import { Button, Form } from "react-bootstrap";
export function Form_(props) {
	const [nombre_cliente, setnombre_cliente] = useState("");
	const [tipo_evento, settipo_evento] = useState("visita_terreno");
	const [numero_contacto_cliente, setnumero_contacto_cliente] = useState("");
	const [direccion_cliente, setdireccion_cliente] = useState("");
	const [fecha_hora_visita_terreno, setfecha_hora_visita_terreno] = useState("");
	const [descripcion, setdescripcion] = useState("");
	function irAContacto() {
		router.push("./visualizar-visitas-admin");
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("../api/agregar_ev", {
				nombre_cliente,
				tipo_evento,
				numero_contacto_cliente,
				direccion_cliente,
				fecha_hora_visita_terreno,
				descripcion
			});
			console.log(res.data);
			router.push("./visualizar-visitas-admin");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="d-flex justify-content-center">
			<Form className="mx-5 w-25" onSubmit={handleSubmit}>
				<h2 className="mb-3 my-3">Agendar visita a terreno</h2>
				<Form.Group>
					<Form.Label className="mt-3">Nombre Cliente </Form.Label>
					<Form.Control
						type="text"
						value={nombre_cliente}
						onChange={(ev) => setnombre_cliente(ev.target.value)}
						name="nombre_cliente"
						id="nombres"
						placeholder="Nombre del cliente"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Numero de contacto </Form.Label>
					<Form.Control
						type="text"
						value={numero_contacto_cliente}
						onChange={(ev) => setnumero_contacto_cliente(ev.target.value)}
						name="numero_contacto_cliente"
						id="numero_contacto_cliente"
						placeholder="Numero de contacto"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Direccion </Form.Label>
					<Form.Control
						type="text"
						value={direccion_cliente}
						onChange={(ev) => setdireccion_cliente(ev.target.value)}
						name="direccion_cliente"
						id="direccion_cliente"
						placeholder="Direccion del cliente"
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Fecha y hora de la visita </Form.Label>
					<Form.Control name="fecha_hora_visita_terreno" value={fecha_hora_visita_terreno} onChange={(ev) => setfecha_hora_visita_terreno(ev.target.value)} type="datetime-local" required />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mt-3">Descripción </Form.Label>
					<Form.Control
						as="textarea"
						type="text"
						value={descripcion}
						onChange={(ev) => setdescripcion(ev.target.value)}
						name="descripcion"
						id="descripcion"
						placeholder="Descripción del evento"
						required
					/>
				</Form.Group>
				<div className="mt-3">
					<Button type="submit" className="btn btn-primary  ">
						Agendar visita
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default Form_;
