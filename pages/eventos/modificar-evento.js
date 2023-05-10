const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
const { useRouter } = require('next/router');
import React, { useState } from 'react';

const Eventos = ({ eventos, clientes, inventario, contactos }) => {
  const router = useRouter();
  const { id } = router.query;

  // Filtrar eventos por ID
  const evento = eventos.find((evento) => evento._id === id);
  const cliente = evento ? clientes.find((c) => c._id === evento.id_Cliente) : null;

  // Obtener los nombres de las necesidades del evento
  const necesidades = evento
    ? evento.Id_Inventario.map((id) => {
        const necesidad = inventario.find((item) => item._id.$oid === id.$oid);
        return necesidad ? necesidad.nombre : null;
      }).filter((necesidad) => necesidad !== null)
    : [];

  // Obtener los detalles de los contactos externos
  const contactosExternos = evento
    ? evento.id_ContactoExterno.map((id) => {
        const contacto = contactos.find((item) => item._id.$oid === id.$oid);
        return contacto ? contacto.detalle : null;
      }).filter((detalle) => detalle !== null)
    : [];

    const handleModificar = () => {
      // Aquí puedes implementar la lógica para modificar el campo correspondiente
      console.log('Modificar campo');
    };

    return (
      <>
        <h1>Información del evento</h1>
        {evento ? (
          <table className="table table-striped">
            <tbody>
              <tr key={evento._id}>
                <th>Nombre del evento:</th>
                <td>{evento.title}</td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
              <tr>
                <th>Fecha del evento:</th>
                <td>{evento.start}</td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
              <tr>
                <th>Fecha de término:</th>
                <td>{evento.end}</td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
              <tr>
                <th>Necesidades del evento:</th>
                <td>
                  <ul>
                    {necesidades.map((necesidad, index) => (
                      <li key={index}>{necesidad}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
              <tr>
                <th>Servicios adicionales:</th>
                <td>{evento.ServicioAdicional ? 'Sí' : 'No'}</td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
              {evento.ServicioAdicional === true && (
                <tr>
                  <th>Adicionales:</th>
                  <td>
                    <ul>
                      {contactosExternos.map((detalle, index) => (
                        <li key={index}>{detalle}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={handleModificar}>Modificar</button>
                  </td>
                </tr>
              )}
              <tr>
                <th>Cliente:</th>
                <td>{cliente ? `${cliente.nombre} ${cliente.apellido}` : '-'}</td>
                <td>
                  <button onClick={handleModificar}>Modificar</button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Evento no encontrado</p>
        )}
      </>
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