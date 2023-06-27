import { useState } from "react";
import axios from "axios";
import { router } from "next/router";
const Layout = require("/components/layout");
const Link = require("next/link");
const http = require("http");
import { Button, Col, Form, Row } from "react-bootstrap";

export function Form_(props) {
	const [nombre_cliente, setnombre_cliente] = useState("");
	const [tipo_evento, settipo_evento] = useState("inventario");
	const [cantidad, setcantidad] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
			const res = await axios.post("../api/agregar_inv", {
				tipo_evento,
				nombre_cliente,
				cantidad,
			});
			console.log(res.data);
			router.push("./eliminar-inventario")
		} catch (err) {
			console.error(err);
		}
	};
	//className='d-flex justify-content-center'
	return (
		<div className="d-flex justify-content-center">
			    <div className="custom-bg-color  text-center w-sm-75 w-md-50 w-lg-25 p-5">
			<Form  onSubmit={handleSubmit}>
				<h1 className=" text-center my-4 ">Agregar Item inventario</h1>

						<Form.Group>
							<Form.Label>Nombre item </Form.Label>
							<Form.Control
								type="text"
								value={nombre_cliente}
								onChange={(ev) => setnombre_cliente(ev.target.value)}
								name="nombre_item"
								id="nombres"
								placeholder="Nombre del item"
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="mt-3">Cantidad </Form.Label>
							<Form.Control
								type="number"
								value={cantidad}
								onChange={(ev) => setcantidad(ev.target.value)}
								name="numero_contacto_cliente"
								id="numero_contacto_cliente"
								placeholder="Cantidad"
								required
							/>
						</Form.Group>
				<div className="mt-3 text-center">
					<Button type="submit" className="btn btn-primary w-25">
                        Agregar
					</Button>
				</div>
			</Form>
			</div>
		</div>
	);
}

export default Form_;