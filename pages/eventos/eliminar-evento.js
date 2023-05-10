import Layout from "/components/layout";
import Link from "next/link";

const Eventos = () => (
  <Layout>
    <h1>Eliminar eventos</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th style={{ width: "25%" }}>Titulo evento</th>
          <th style={{ width: "25%" }}>Inicio</th>
          <th style={{ width: "25%" }}>Fin</th>
          <th style={{ width: "25%" }}>Cliente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>hola</td>
          <td>hola2</td>
          <td>hola3</td>
          <td>hola4</td>
          <td style={{ whiteSpace: "nowrap" }}>
            <Link href={``} className="btn btn-sm btn-danger me-1">
              Eliminar
            </Link>
          </td>
        </tr>
        <tr>
          <td>hola</td>
          <td>hola2</td>
          <td>hola3</td>
          <td>hola4</td>
          <td style={{ whiteSpace: "nowrap" }}>
            <Link href={``} className="btn btn-sm btn-danger me-1">
              Eliminar
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </Layout>
);

export default Eventos;
