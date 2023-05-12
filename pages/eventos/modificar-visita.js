const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
const { useRouter } = require('next/router');
import moment from 'moment/moment';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ModificarVisitas = (props) => {
  const { visitas } = props
  const router = useRouter();
  const { id } = router.query;

  // Filtrar eventos por ID
  const visita = visitas.find((value)=>value._id === id)
  //console.log(visita)
  //const visita = {}
  

    const [data, setData] = useState({
      _id: id,
      nombre_cliente:visita.nombre_cliente,
      numero_contacto_cliente: visita.numero_contacto_cliente,
      direccion_cliente: visita.direccion_cliente,
      fecha_hora_visita_terreno: visita.fecha_hora_visita_terreno
    })

    const submitModificar = async (e) => {
      e.preventDefault();
      
      const response = await fetch('http://localhost:3000/api/visitas', {
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
            <Form.Label>Nombre del cliente </Form.Label>
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

          
          
          <Form.Group>
            <Form.Label>Fecha y hora de visita</Form.Label>
            <Form.Control 
              required 
              onChange={handleControl}
              defaultValue={moment(data.fecha_hora_visita_terreno).format('yyyy-MM-DD')}
              type="date" 
              placeholder='Fecha y hora de visita'
              name='fecha_hora_visita_terreno'
            />
          </Form.Group>
          <Button type="submit">Modificar</Button>
        </Form>
      </div>
    );
};

export async function getServerSideProps() {
  let response = await fetch('http://localhost:3000/api/visitas',{
    method: 'GET',
  })
  response = await response.json();

  console.log(response);
  
  return {
    props: {visitas: response.data}
  }
}
export default ModificarVisitas;