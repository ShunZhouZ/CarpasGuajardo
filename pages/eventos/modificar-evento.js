const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
const { useRouter } = require('next/router');
import moment from 'moment/moment';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Eventos = ({ eventos, clientes, inventario, contactos }) => {
  const router = useRouter();
  const { id } = router.query;

  // Filtrar eventos por ID
  const evento = eventos.find((evento) => evento._id === id);
  const cliente = evento ? clientes.find((c) => c._id === evento.id_Cliente) : null;

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
      carpa_toldo: evento.carpa_toldo,
      cubre_piso: evento.cubre_piso
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
      console.log(await response.json());
      // Aquí puedes implementar la lógica para modificar el campo correspondiente
      console.log('Modificar campo');
    };

    const handleControl = (e) => {
      e.preventDefault();
      const {value, name} = e.target
      setData({
        ...data,
        [name]: value
      })
    }

    const handleCheck = (e) => {
      const {checked, name} = e.target
      setData({
        ...data,
        [name]: checked
      })
    }
    return (
      <div className='mx-5'>
        <Form onSubmit={submitModificar}>
          <Form.Group>
            <Form.Label>Nombre del Evento </Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.nombre_cliente}
              type="text" 
              placeholder='Nombre del evento'
              name='nombre_cliente'
            />
          </Form.Group>
          
          
            <Form.Label>Numero de contacto del cliente </Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.numero_contacto_cliente}
              type="text" 
              placeholder='Numero del cliente'
              name='numero_contacto_cliente'
            />

            <Form.Label>Direccion del cliente </Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.direccion_cliente}
              type="text" 
              placeholder='Direccion del cliente'
              name='direccion_cliente'
            />

            <Form.Label>Monto total </Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.monto_total}
              type="text" 
              placeholder='Monto total'
              name='monto_total'
            />

            <Form.Label>Anticipo</Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.anticipo}
              type="text" 
              placeholder='Anticipo'
              name='anticipo'
            />

            <Form.Label>Metros cuadrados</Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.metros_cuadrados}
              type="text" 
              placeholder='metros_cuadrados'
              name='metros_cuadrados'
            />

            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              onChange={handleControl}
              required
              defaultValue={data.descripcion}
              type="text" 
              placeholder='descripcion'
              name='descripcion'
            />
          
          
          <Form.Group>
            <Form.Label>Fecha de inicio del evento</Form.Label>
            <Form.Control 
              required 
              onChange={handleControl}
              defaultValue={moment(data.fecha_inicio).format('yyyy-MM-DD')}
              type="date" 
              placeholder='Modificar Fecha de inicio'
              name='fecha_inicio'
            />
            <Form.Label>Fecha de termino del evento</Form.Label>
            <Form.Control 
              required 
              onChange={handleControl}
              defaultValue={moment(data.fecha_termino).format('yyyy-MM-DD')}
              type="date" 
              placeholder='Modificar Fecha de termino'
              name='fecha_termino'
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Carpa toldo</Form.Label>
            <Form.Check
              onChange={handleCheck}
              type="switch"
              name="Carpa toldo"
              defaultChecked={data.carpa_toldo}
            />
            <Form.Label>Cubre piso</Form.Label>
            <Form.Check
              onChange={handleCheck}
              type="switch"
              name="Cubre piso"
              defaultChecked={data.cubre_piso}
            />
          </Form.Group>
          <Button type="submit">Modificar</Button>
        </Form>
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
    
    const clientesPromise = fetch('http://localhost:3000/api/clientes')
      .then((response) => response.json())
      .then((data) => data.data);
    const inventarioPromise = fetch('http://localhost:3000/api/Inventario')
      .then((response) => response.json())
      .then((data) => data.data);
    
    const contactosPromise = fetch('http://localhost:3000/api/contacts')
      .then((response) => response.json())
      .then((data) => data.data);
    
    try {
      const [eventos, clientes, inventario, contactos] = await Promise.all([
        eventosPromise,
        clientesPromise,
        inventarioPromise,
        contactosPromise,
      ]);
    
      resolve({ props: { eventos, clientes, inventario, contactos } });
    } catch (error) {
      reject(error);
    }
  });
}
export default Eventos;