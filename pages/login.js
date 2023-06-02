import { useState } from "react";
import {userServiceFactory} from "../clientServices/userService";
import useUser from "../lib/useUser";
import { FormGroup, Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const userService = userServiceFactory();

export default function Login() {
    const { user, mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleConfirmationClose = () => setShowConfirmation(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            mutateUser(
                await userService.login(username, password)
            );
        } catch (error) {
            setShowConfirmation(true);
            // alert(error.response.data.error);
        }
    };

    const usernameHandler =  (e) => {
        setUsername(e.target.value);
    }

    const passwordHandler =  (e) => {
        setPassword(e.target.value);
    }

    return <div>
    {!user ? (
      <h1>Loading....</h1>
    ) : (
      <>
        {!user.isLoggedIn && (
        <div className="container">
        <div className="row">
            <div className="col-md-4 offset-md-4 mt-5">
            <h1 className="text-4xl my-8">Login</h1>
                <Form onSubmit={handleSubmit}> 
                    <FormGroup className="mb-3">
                        <Form.Label className="mt-3" htmlFor="uname"><b>Usuario</b></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su RUT" name="uname" required onChange={usernameHandler} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label className="mt-3" htmlFor="psw"><b>Contraseña</b></Form.Label>
                        <Form.Control type="password" placeholder="Ingrese su contraseña" name="psw" required onChange={passwordHandler} />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Entrar
                    </Button>{' '}
                    <Button variant="link" href="./trabajadores/form-password">
                        Recuperar Contraseña
                    </Button>        
                </Form>
            </div>
            
        </div>
            <Modal show={showConfirmation} onHide={handleConfirmationClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de autenticacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Usuario o contraseña incorrecta
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmationClose}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )}
      </>
    )}
  </div>;
}