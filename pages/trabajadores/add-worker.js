import { useState } from "react";
import { userServiceFactory } from "../../clientServices/userService";
import useUser from "../../lib/useUser";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const userService = userServiceFactory();

export default function CreateUserForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [nombre, setNombre] = useState("");
	const [correo, setCorreo] = useState("");
	const [contacto, setContacto] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// la constrasena sera igual al rut ingresado
			const password = username;
			await userService.createUser(username, password, nombre, correo, contacto);
			window.location.href = `/`;
		} catch (error) {
			alert("Error al crear el usuario");
		}
	};

	const usernameHandler = (e) => {
		setUsername(e.target.value);
	};

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};

	const nombreHandler = (e) => {
		setNombre(e.target.value);
	};

	const correoHandler = (e) => {
		setCorreo(e.target.value);
	};

	const contactoHandler = (e) => {
		setContacto(e.target.value);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-4 offset-md-4 mt-5">
					<h1 className=" text-center mb-4">Agregar Trabajador</h1>
					<Form onSubmit={handleSubmit}>
						<FormGroup className="mb-3">
							<Form.Label htmlFor="uname">
								<b>Trabajador</b>
							</Form.Label>
							<Form.Control type="text" placeholder="Ingrese el RUT" name="uname" required onChange={usernameHandler} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Form.Label htmlFor="name">
								<b>Nombre</b>
							</Form.Label>
							<Form.Control type="text" placeholder="Ingrese el nombre" name="name" required onChange={nombreHandler} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Form.Label htmlFor="mail">
								<b>Correo</b>
							</Form.Label>
							<Form.Control type="mail" placeholder="Ingrese el correo electronico" name="mail" required onChange={correoHandler} />
						</FormGroup>
						<FormGroup className="mb-3">
							<Form.Label htmlFor="contacto">
								<b>Contacto</b>
							</Form.Label>
							<Form.Control type="text" placeholder="Ingrese un telefono de contacto" name="contacto" required onChange={contactoHandler} />
						</FormGroup>
						<div className="mt-4 text-center">
							<Button color="primary" type="submit">
								Agregar trabajador
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
