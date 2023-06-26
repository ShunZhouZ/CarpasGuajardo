import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormularioPorPasos = () => {
	const [paso, setPaso] = useState(1);
	const [nombre_cliente, setnombre_cliente] = useState("");
	const [tipo_evento, settipo_evento] = useState("Evento");
	const [numero_contacto_cliente, setnumero_contacto_cliente] = useState("");
	const [direccion_cliente, setdireccion_cliente] = useState("");
	const [fecha_inicio, setfecha_inicio] = useState("");
	const [fecha_termino, setfecha_termino] = useState("");
	const [monto_total, setmonto_total] = useState("");
	const [anticipo, setanticipo] = useState("");
	const [carpa, setCarpa] = useState("");
	const [toldo, setToldo] = useState("");
	const [cubre_piso, setcubre_piso] = useState(false);
	const [metros_cuadrados, setmetros_cuadrados] = useState("");
	const [descripcion, setdescripcion] = useState("");
	const [Iluminacion, setIluminacion] = useState(false);
	const [calefaccion, setCalefacion] = useState(false);
	const [estado, setEstado] = useState("Agendado");
  const [notificacion, setNotificacion] = useState(false);


	const router = useRouter();

	const handleNext = () => {
		setPaso(paso + 1);
	};

	const handlePrevious = () => {
		setPaso(paso - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("../api/agregar_ev", {
        estado,
        notificacion,
				tipo_evento,
				nombre_cliente,
				numero_contacto_cliente,
				direccion_cliente,
				fecha_inicio,
				fecha_termino,
				monto_total,
				anticipo,
				carpa,
				toldo,
				calefaccion,
				Iluminacion,
				cubre_piso,
				metros_cuadrados,
				descripcion
			});
			console.log(res.data);
			router.push("./visualizar-admin");
		} catch (err) {
			console.error(err);
		}
	};

	const handleSelectChange = (event) => {
		const seleccion = event.target.value === "carpa";
		setCarpa(seleccion);
		setToldo(!seleccion);
	};

	const renderFormulario = () => {
		switch (paso) {
			case 1:
				return (
					<div>
						<Form.Group>
							<Form.Label className="mt-3">Nombre Cliente </Form.Label>
							<Form.Control
								className="w-10"
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
							<Form.Label className="mt-3">Numero cliente </Form.Label>
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
					</div>
				);
			case 2:
				return (
					<div>
						<Form.Group>
							<Form.Label>Fecha de inicio </Form.Label>
							<Form.Control name="fecha_inicio" value={fecha_inicio} onChange={(ev) => setfecha_inicio(ev.target.value)} type="datetime-local" required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Fecha de Termino </Form.Label>
							<Form.Control name="fecha_termino" value={fecha_termino} onChange={(ev) => setfecha_termino(ev.target.value)} type="datetime-local" required />
						</Form.Group>
					</div>
				);
			case 3:
				return (
					<div>
						<Form.Group>
							<Form.Label className="mt-3">Monto total</Form.Label>
							<Form.Control name="monto_total" value={monto_total} onChange={(ev) => setmonto_total(ev.target.value)} type="number" placeholder="Monto total" required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Anticipo</Form.Label>
							<Form.Control name="anticipo" value={anticipo} onChange={(ev) => setanticipo(ev.target.value)} type="number" placeholder="Anticipo" required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Descripción</Form.Label>
							<Form.Control as="textarea" name="descripcion" value={descripcion} onChange={(ev) => setdescripcion(ev.target.value)} type="text" placeholder="Descripcion" required />
							<Form.Group>
								<Form.Label className="mt-3">Metros cuadrados </Form.Label>
								<Form.Control
									name="metros_cuadrados"
									value={metros_cuadrados}
									onChange={(ev) => setmetros_cuadrados(ev.target.value)}
									type="number"
									placeholder="Metros cuadrados"
									required
								/>
							</Form.Group>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Seleccione si desea carpa o toldo</Form.Label>
							<Form.Control as="select" onChange={handleSelectChange} required>
								<option>Selección</option>
								<option value="carpa">Carpa</option>
								<option value="toldo">Toldo</option>
							</Form.Control>
							<Row xs="auto">
								<Col>
									<Form.Label className="mt-3">Cubrepiso</Form.Label>
									<Form.Check type="switch" checked={cubre_piso} onChange={(ev) => setcubre_piso(ev.target.checked)} />
								</Col>
								<Col>
									<Form.Label className="mt-3">Calefacción</Form.Label>
									<Form.Check type="switch" checked={calefaccion} onChange={(ev) => setCalefacion(ev.target.checked)} />
								</Col>
								<Col>
									<Form.Label className="mt-3">Iluminación</Form.Label>
									<Form.Check type="switch" checked={Iluminacion} onChange={(ev) => setIluminacion(ev.target.checked)} />
								</Col>
							</Row>
						</Form.Group>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="custom-bg-color  text-center w-sm-75 w-md-50 w-lg-25 p-5">
				<div className=" m-5">
					<Form className="w-100" onSubmit={handleSubmit}>
						<h1 className=" my-5">Agendar Evento</h1>
						{renderFormulario()}
						<div>
							{paso > 1 && (
								<Button className="mx-2 mt-3" onClick={handlePrevious}>
									Anterior
								</Button>
							)}
							{paso < 3 ? (
								<Button type="button" className="w-90 mt-3" onClick={handleNext}>
									Siguiente
								</Button>
							) : (
								<Button type="submit" className="btn btn-primary w-90 mx-3 mt-3">
									Agendar
								</Button>
							)}
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default FormularioPorPasos;
