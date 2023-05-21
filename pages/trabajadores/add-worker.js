import { useState } from "react";
import {userServiceFactory} from "../../clientServices/userService";
import useUser from "../../lib/useUser";
import { FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            await userService.createUser(username, password, nombre, correo, contacto);
            window.location.href = `/`;

        } catch (error) {
            alert("Error al crear el usuario");
        }
    };

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const nombreHandler = (e) => {
        setNombre(e.target.value);
    }

    const correoHandler = (e) => {
        setCorreo(e.target.value);
    }

    const contactoHandler = (e) => {
        setContacto(e.target.value);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 mt-5">
                    <h3>Crear Usuario</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="uname"><b>Usuario</b></Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su RUT" name="uname" required onChange={usernameHandler} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="psw"><b>Contraseña</b></Form.Label>
                            <Form.Control type="password" placeholder="Ingrese su contraseña" name="psw" required onChange={passwordHandler} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="name"><b>Nombre</b></Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre" name="name" required onChange={nombreHandler} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="mail"><b>Correo</b></Form.Label>
                            <Form.Control type="mail" placeholder="Ingrese el correo electronico" name="mail" required onChange={correoHandler} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label htmlFor="contacto"><b>Contacto</b></Form.Label>
                            <Form.Control type="text" placeholder="Ingrese un telefono de contacto" name="contacto" required onChange={contactoHandler} />
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Crear Usuario
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}