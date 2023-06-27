import { useState } from "react";
import {userServiceFactory} from "../../clientServices/userService";
import useUser from "../../lib/useUser";
import { FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const userService = userServiceFactory();

export default function sendEmail() {
    const { user, mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });
    
    const [username, setUsername] = useState("");
    const [correo, setCorreo] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.forgotPassword(username, correo);
            setShowModal(true);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        // Redirigir a la página principal después de cerrar el modal
        window.location.href = `/`;
    };

    const usernameHandler =  (e) => {
        setUsername(e.target.value);
    }

    const correoHandler = (e) => {
        setCorreo(e.target.value);
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
            <h1 className="text-4xl my-8">Recuperar Contraseña</h1>
                <Form onSubmit={handleSubmit}> 
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="uname"><b>RUT</b></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su RUT" name="uname" required onChange={usernameHandler} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="correo"><b>Correo</b></Form.Label>
                            <Form.Control type="correo" placeholder="Ingrese el correo electronico" name="correo" required onChange={correoHandler} />
                    </FormGroup>
                    
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>{' '}
                    <Button variant="link" href="../login">
                        Volver
                    </Button>        
                </Form>
            </div>
            
        </div>
        </div>
        )}
      </>
    )}

    {/* Modal de éxito */}
    <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Cambio de Contraseña Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Tu contraseña ha sido cambiada correctamente! <br />(Recuerda revisar tu carpeta de Spam)</Modal.Body>
        <Modal.Footer>
            <Button onClick={handleModalClose}>
                Aceptar
            </Button>
        </Modal.Footer>
	</Modal>

  </div>;
}