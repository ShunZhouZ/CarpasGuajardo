import { useState } from "react";
import {userServiceFactory} from "../clientServices/userService";
import useUser from "../lib/useUser";
import { FormGroup } from "react-bootstrap";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            mutateUser(
                await userService.login(username, password)
            );
        } catch (error) {
            alert(error.response.data.error);
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
                <h3>Login</h3>
                <Form onSubmit={handleSubmit}> 
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="uname"><b>Usuario</b></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su RUT" name="uname" required onChange={usernameHandler} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="psw"><b>Contrasena</b></Form.Label>
                        <Form.Control type="password" placeholder="Ingrese su contrasena" name="psw" required onChange={passwordHandler} />
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Entrar
                    </Button>
                </Form>
            </div>
        </div>
        </div>
        )}
      </>
    )}
  </div>;
}