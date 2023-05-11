import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./index"

// const LoginMenu = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-4 offset-md-4 mt-5">
//           <h3>Login</h3>
//           <Form onSubmit={handleLogin}>
//             <FormGroup>
//               <Label for="username">Username</Label>
//               <Input
//                 type="text"
//                 name="username"
//                 id="username"
//                 value={username}
//                 onChange={handleUsernameChange}
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label for="password">Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//             </FormGroup>
//             <Button color="primary" type="submit">
//               Login
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Realiza la solicitud HTTP a la API para autenticar al usuario
            const response = await axios.post('/api/login', { username, password });
  
            // Maneja la respuesta de la API según tus necesidades
            console.log(response.data); // Aquí puedes mostrar una notificación de éxito o redirigir a otra página
        } catch (error) {
            // Maneja los errores de la API según tus necesidades
            console.error(error.response.data); // Puedes mostrar un mensaje de error al usuario
        }
    };
  
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-4 offset-md-4 mt-5">
            <h3>Login</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" value={username} id="username" onChange={(e) => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                    <div>
                        <Label for="password">Contrasena</Label>
                        <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Login
                    </Button>
                </Form>
                </div>
            </div>
        </div>
    );
};
  
export default LoginForm;
  

// export default LoginMenu;
