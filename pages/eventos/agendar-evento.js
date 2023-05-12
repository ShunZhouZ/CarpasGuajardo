import { useState } from 'react';
import axios from "axios";
import { router } from 'next/router';
const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
import { Button, Col, Form, Row } from 'react-bootstrap';

export function Form_(props) {
    const [nombre_cliente, setnombre_cliente] = useState("");
    const [tipo_evento, settipo_evento] = useState("Evento");
    const [numero_contacto_cliente, setnumero_contacto_cliente] = useState("");
    const [direccion_cliente, setdireccion_cliente] = useState("");
    const [fecha_inicio, setfecha_inicio] = useState("");
    const [fecha_termino, setfecha_termino] = useState("");
    const [monto_total, setmonto_total] = useState("");
    const [anticipo, setanticipo] = useState("");
    const [carpa_toldo, setcarpa_toldo] = useState("");
    const [cubre_piso, setcubre_piso] = useState("");
    const [metros_cuadrados, setmetros_cuadrados] = useState("");
    const [descripcion, setdescripcion] = useState("");
    function irAContacto() {
        router.push('./visualizar-worker');
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                const res = await axios.post("../api/agregar_ev", {
                    tipo_evento,
                    nombre_cliente,
                    numero_contacto_cliente,
                    direccion_cliente,
                    fecha_inicio,
                    fecha_termino,
                    monto_total,
                    anticipo,
                    carpa_toldo,
                    cubre_piso,
                    metros_cuadrados,
                    descripcion
                });
                console.log(res.data);

        } catch (err) {
            console.error(err);

        }
        };
        //className='d-flex justify-content-center'
    return (
        <div className='d-flex justify-content-center' >
          <Form className='mx-5 w-75' onSubmit={handleSubmit}>
            <h1 className=' text-center my-4 '>Agendar Evento</h1>
            <Row xs={2} md={2} >
              <Col>
            <Form.Group >
            <Form.Label >Nombre Cliente </Form.Label>
            <Form.Control
            type="text"
            value={nombre_cliente}
            onChange={ev =>setnombre_cliente(ev.target.value)}
            name='nombre_cliente'
            id="nombres"
            placeholder="Nombre del cliente"
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label className='mt-3'>Numero cliente </Form.Label>
            <Form.Control
                type="text"
                value={numero_contacto_cliente}
                onChange={ev => setnumero_contacto_cliente(ev.target.value)}
                name='numero_contacto_cliente'
                id="numero_contacto_cliente"
                placeholder="Numero de contacto"
            />
          </Form.Group>
            <Form.Group>
            <Form.Label className='mt-3'>Direccion </Form.Label>
            <Form.Control
                type="text"
                value={direccion_cliente}
                onChange={ev => setdireccion_cliente(ev.target.value)}
                name='direccion_cliente'
                id="direccion_cliente"
                placeholder="Direccion del cliente"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3'>Metros cuadrados </Form.Label>
            <Form.Control
                      name='metros_cuadrados'
                      value={metros_cuadrados}
                      onChange={ev => setmetros_cuadrados(ev.target.value)}
                      type="number"
                      placeholder="Metros cuadrados"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3'>Cubre piso</Form.Label>
            <Form.Check
                        type="switch"
                        checked={cubre_piso}
                        onChange={ev => setcubre_piso(ev.target.checked)}
            />
            <Form.Label>Carpa o Toldo</Form.Label>
            <Form.Check
                        type="switch"
                        checked={carpa_toldo}
                        onChange={ev => setcarpa_toldo(ev.target.checked)}
            />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group>
            <Form.Label>Fecha de inicio </Form.Label>
            <Form.Control
                        name='fecha_inicio'
                        value={fecha_inicio}
                        onChange={ev => setfecha_inicio(ev.target.value)}
                        type="datetime-local"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3' >Fecha de Termino </Form.Label>
            <Form.Control
                        name='fecha_termino'
                        value={fecha_termino}
                        onChange={ev => setfecha_termino(ev.target.value)}
                        type="datetime-local"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3'>Monto total</Form.Label>
            <Form.Control
                        name='monto_total'
                        value={monto_total}
                        onChange={ev => setmonto_total(ev.target.value)}
                        type="number"
                        placeholder="Monto total"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3'>Anticipo</Form.Label>
            <Form.Control
                       name='anticipo'
                       value={anticipo}
                       onChange={ev => setanticipo(ev.target.value)}
                       type="number"
                       placeholder="Anticipo"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='mt-3'>Descripcion</Form.Label>
            <Form.Control
            as="textarea"
                        name='descripcion'
                        value={descripcion}
                        onChange={ev => setdescripcion(ev.target.value)}
                        type="text"
                        placeholder="Descripcion"
            />
          </Form.Group> 
            </Col>   
            </Row>
            <div className='mt-3 text-center '>
            <button onClick={irAContacto} type="submit" className="btn btn-primary w-25 ">Guardar</button>
            </div>
             </Form> 
          </div>
    );
}

export default Form_;