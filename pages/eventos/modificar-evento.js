const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
const { useRouter } = require('next/router');
import moment from 'moment/moment';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';

const Eventos = ({ eventos, clientes, inventario, contactos }) => {
  const router = useRouter();
  const { id } = router.query;

  // Filtrar eventos por ID
  const evento = eventos.find((evento) => evento._id === id);

    const [data, setData] = useState({
      _id: id,
      nombre_cliente: evento.nombre_cliente,
      numero_contacto_cliente: evento.numero_contacto_cliente,
      direccion_cliente: evento.direccion_cliente,
      monto_total: evento.monto_total,
      anticipo: evento.anticipo,
      metros_cuadrados: evento.metros_cuadrados,
      descripcion: evento.descripcion,
      fecha_inicio: evento.fecha_inicio,
      termino_inicio: evento.termino_inicio,
      toldo: evento.toldo,
      carpa: evento.carpa,
      cubre_piso: evento.cubre_piso,
      Iluminacion: evento.Iluminacion,
      calefaccion: evento.calefaccion
    })

    const submitModificar = async (e) => {
      e.preventDefault();
      
      const response = await fetch('http://localhost:3000/api/eventos', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      handleShow();

      console.log(await response.json());
      console.log('Modificar campo');
    };

    const TipoElemento = {
      carpa:{
        carpa: true,
        toldo: false
      },
      toldo:{
        toldo: true,
        carpa: false
      }
    }

    const handleCheckTipo = (event) => {
      const selectedOption = event.target.value;
      const value = TipoElemento[selectedOption] 
      setData({
        ...data,
        ...value
      })
    };

    const handleControl = (e) => {
      e.preventDefault();
      const {value, name} = e.target
      setData({
        ...data,
        [name]: value
      })
    }
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
      setShow(false);
      window.location.href = "/eventos/eliminar-evento";// Reinicia la página web
    };

    const handleCheck = (e) => {
      const {checked, name} = e.target
      setData({
        ...data,
        [name]: checked
      })
    }

console.log(data)

    return (
      <div className="d-flex justify-content-center">
			<Form className="mx-5 w-75" onSubmit={submitModificar}>
				<h1 className=" text-center my-4 ">Modificar evento</h1>
				<Row xs={2} md={2}>
					<Col>
						<Form.Group>
							<Form.Label>Nombre Cliente </Form.Label>
							<Form.Control
								onChange={handleControl}
                required
                defaultValue={data.nombre_cliente}
                type="text" 
                placeholder='Nombre del evento'
                name='nombre_cliente'
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label className="mt-3">Numero cliente </Form.Label>
							<Form.Control
								onChange={handleControl}
                required
                defaultValue={data.numero_contacto_cliente}
                type="text" 
                placeholder='Numero del cliente'
                name='numero_contacto_cliente'
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Direccion </Form.Label>
							<Form.Control
								onChange={handleControl}
                required
                defaultValue={data.direccion_cliente}
                type="text" 
                placeholder='Direccion del cliente'
                name='direccion_cliente'
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Metros cuadrados </Form.Label>
							<Form.Control 
                      onChange={handleControl}
                      required
                      defaultValue={data.metros_cuadrados}
                      type="text" 
                      placeholder='metros_cuadrados'
                      name='metros_cuadrados'/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Selecione si desea carpa o toldo</Form.Label>
              <Form.Control
                as="select"
                onChange={handleCheckTipo}
                defaultValue={data.carpa ? "carpa" : (data.toldo ? "toldo" : "")}
              >
                <option value="carpa" abled={!data.carpa}>Carpa</option>
                <option value="toldo" abled={!data.toldo}>Toldo</option>
              </Form.Control>

							<Row xs = "auto">
								<Col>
								<Form.Label className="mt-3">Cubrepiso</Form.Label>
									<Form.Check 
                    onChange={handleCheck}
                    type="switch"
                    name="cubre_piso"
                    defaultChecked={data.cubre_piso} />
								</Col>
								<Col>
								<Form.Label className="mt-3">Calefacción</Form.Label>
									<Form.Check 
                    onChange={handleCheck}
                    type="switch"
                    name="calefaccion"
                    defaultChecked={data.calefaccion} />
								</Col>
								<Col>
								<Form.Label className="mt-3">Iluminacion</Form.Label>
									<Form.Check 
                    onChange={handleCheck}
                    type="switch"
                    name="Iluminacion"
                    defaultChecked={data.Iluminacion} />
								</Col>
							</Row>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Fecha de inicio </Form.Label>
							<Form.Control required 
                        onChange={handleControl}
                        defaultValue={moment(data.fecha_inicio).format('yyyy-MM-DD')}
                        type="datetime-local" 
                        placeholder='fecha_inicio'
                        name='fecha_inicio' />
						</Form.Group> 
						<Form.Group>
							<Form.Label className="mt-3">Fecha de Termino </Form.Label>
							<Form.Control required 
                        onChange={handleControl}
                        defaultValue={moment(data.fecha_termino).format('yyyy-MM-DD')}
                        type="datetime-local" 
                        placeholder='fecha_termino'
                        name='fecha_termino' />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Monto total</Form.Label>
							<Form.Control 
                        onChange={handleControl}
                        required
                        defaultValue={data.monto_total}
                        type="text" 
                        placeholder='monto_total'
                        name='monto_total' />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Anticipo</Form.Label>
							<Form.Control 
                      onChange={handleControl}
                      required
                      defaultValue={data.anticipo}
                      type="text" 
                      placeholder='anticipo'
                      name='anticipo' />
						</Form.Group>
						<Form.Group>
							<Form.Label className="mt-3">Descripcion</Form.Label>
							<Form.Control as="textarea"
              onChange={handleControl}
              required
              defaultValue={data.descripcion}
              type="text" 
              placeholder='descripcion'
              name='descripcion' />
						</Form.Group>
					</Col>
				</Row>
				<div className="mt-3 text-center ">
        <button onClick={submitModificar} type="submit" className="btn btn-primary w-25 ">Guardar</button>
				</div>
			</Form>

      <Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Evento modificado</Modal.Title>
				</Modal.Header>
				<Modal.Body>El evento ha sido modificado correctamente.</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose}>
						Aceptar
					</Button>
				</Modal.Footer>
			</Modal>

		</div>
    );
};

export async function getServerSideProps() {
  return new Promise(async (resolve, reject) => {
    const eventosPromise = new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/eventos', // Cambia la ruta a tu ruta de la API
        method: 'GET',
      };

      const req=http.request(options, async (res) => {
        let data = '';
        res.on('data', (chunk) => {
        data += chunk;
        });
        res.on('end', async () => {
          const eventos = JSON.parse(data).data;
          resolve(eventos);
        });
      });
    
      req.on('error', (error) => {
        reject(error);
      });
    
      req.end();
    });
    
    try {
      const [eventos] = await Promise.all([
        eventosPromise,
      ]);
    
      resolve({ props: { eventos } });
    } catch (error) {
      reject(error);
    }
  });
}
export default Eventos;