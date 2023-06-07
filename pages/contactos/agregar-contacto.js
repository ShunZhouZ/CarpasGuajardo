import { useState } from "react";
import axios from "axios";
import { router } from "next/router";
const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
import { Button, Col, Form, Row } from "react-bootstrap";

export function Form_(props) {
	const [nombre_cliente, setnombre_cliente] = useState("");
	const [tipo_evento, settipo_evento] = useState("contacto");
	const [numero_contacto_cliente, setnumero_contacto_cliente] = useState("");
	const [direccion_cliente, setdireccion_cliente] = useState("");
	const [metros_cuadrados, setmetros_cuadrados] = useState("");
	const [descripcion, setdescripcion] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
			const res = await axios.post("../api/agregar_con", {
				tipo_evento,
				nombre_cliente,
				numero_contacto_cliente,
				direccion_cliente,
				metros_cuadrados,
				descripcion
			});
			console.log(res.data);
			router.push("./eliminar-contacto")
		} catch (err) {
			console.error(err);
		}
	};
	//className='d-flex justify-content-center'
    //nombre, teléfono, dirección, correo electrónico y detalle.
	return (
		<div className="d-flex justify-content-center">
			<div className="custom-bg-color  text-center w-sm-75 w-md-50 w-lg-25 p-5">
			<Form  onSubmit={handleSubmit}>
				<h1 className=" text-center my-4 ">Agregar contaco</h1>
						<Form.Group>
							<Form.Label>Nombre Cliente </Form.Label>
							<Form.Control
								type="text"
								value={nombre_cliente}
								onChange={(ev) => setnombre_cliente(ev.target.value)}
								name="nombre_contacto"
								id="nombres"
								placeholder="Nombre"
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="mt-3">Telefono </Form.Label>
							<Form.Control
								type="text"
								value={numero_contacto_cliente}
								onChange={(ev) => setnumero_contacto_cliente(ev.target.value)}
								name="numero_contacto_cliente"
								id="numero_contacto_cliente"
								placeholder="Telefono contacto"
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Dirección </Form.Label>
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
							<Form.Label className="mt-3">Correo electrónico </Form.Label>
							<Form.Control name="correo" value={metros_cuadrados} onChange={(ev) => setmetros_cuadrados(ev.target.value)} type="email" placeholder="Correo electronico" required />
						</Form.Group>
	
						<Form.Group>
							<Form.Label className="mt-3">Detalles</Form.Label>
							<Form.Control as="textarea" name="descripcion" value={descripcion} onChange={(ev) => setdescripcion(ev.target.value)} type="text" placeholder="Detalles del contacto" required />
						</Form.Group>

				<div className="mt-3 text-center">
					<Button type="submit" className="btn btn-primary w-50">
						Agregar contacto
					</Button>
				</div>
			</Form>
			</div>
		</div>
	);
}

export default Form_;