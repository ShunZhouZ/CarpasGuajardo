const Layout = require('/components/layout');
const Link = require('next/link');
const http = require('http');
const { useRouter } = require('next/router');

const Eventos = ({ eventos, clientes }) => {
  const router = useRouter();
  const { id } = router.query;

  // Filtrar eventos por ID
  const evento = eventos.find((evento) => evento._id === id);
  const cliente = evento ? clientes.find((c) => c._id === evento.id_Cliente) : null;

  return (
    <>
      <h1>Información del evento</h1>
      {evento ? (
        <table className="table table-striped">
          <tbody>
            <tr key={evento._id}>
              <th>Nombre del evento:</th>
              <td>{evento.title}</td>
            </tr>
            <tr>
              <th>Fecha del evento:</th>
              <td>{evento.start}</td>
            </tr>
            <tr>
              <th>Fecha de término:</th>
              <td>{evento.end}</td>
            </tr>
            <tr>
              <th>Necesidades del evento:</th>
              <td>{evento.Id_Inventario.join(', ')}</td>
            </tr>
            <tr>
              <th>Servicios adicionales:</th>
              <td>{evento.ServicioAdicional ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
              <th>Cliente:</th>
              <td>{cliente ? `${cliente.nombre} ${cliente.apellido}` : '-'}</td>
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
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/eventos', // Cambia la ruta a tu ruta de la API
      method: 'GET',
    };

    const req = http.request(options, async (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        const eventos = JSON.parse(data).data;

        // Obtener clientes
        const clientesResponse = await fetch('http://localhost:3000/api/clientes');
        const clientesData = await clientesResponse.json();
        const clientes = clientesData.data;

        resolve({ props: { eventos, clientes } });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

export default Eventos;
