import { Button, Modal, Table } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es');
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";

const Visitas = (props) => {
  const { defaultVisits } = props;
  const [visits, setVisits] = useState(defaultVisits);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [visitIdToDelete, setVisitIdToDelete] = useState(null);
  const [visitIdToShowDescription, setVisitIdToShowDescription] = useState(null); // Nuevo estado para almacenar el ID de la visita a mostrar

  const reloadVisits = useCallback(async () => {
    let res = await fetch("http://localhost:3000/api/visitas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let _visits = await res.json();
    setVisits(_visits.data);
  }, []);

  const modifyElement = (id) => {
    window.location.href = `/visitas-tecnicas/modificar-visita?id=${id}`;
  };

  const deleteElement = (id) => {
    setVisitIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const deleteResponse = await fetch(`http://localhost:3000/api/visitas?id=${visitIdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    setShowDeleteModal(false);
    setShowSuccessModal(true);
    console.log(await deleteResponse.json());
    await reloadVisits();
  };

  const showDescription = (id) => {
    setVisitIdToShowDescription(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <h1>Lista de visitas</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr key={0}>
            <th style={{ width: "5%" }}>Nº</th>
            <th style={{ width: "15%" }}>Nombre cliente</th>
            <th style={{ width: "15%" }}>Contacto</th>
            <th style={{ width: "15%" }}>Direccion</th>
            <th style={{ width: "15%" }}>Descripción</th>
            <th style={{ width: "15%" }}>Fecha visita</th>
            <th style={{ width: "20%", textAlign: "center" }}>Realizacion</th>
            <th style={{ width: "47%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {visits?.map((visit, index) => (
            <tr key={visit._id}>
              <td>{index + 1}</td>
              <td>{visit.nombre_cliente}</td>
              <td>{visit.numero_contacto_cliente}</td>
              <td>{visit.direccion_cliente}</td>
              <td style={{ textAlign: "center" }}>
                <Button className="btn btn-light" onClick={() => showDescription(visit._id)}> {/* Botón para mostrar la descripción */}
                <FontAwesomeIcon icon={faEye} />Visualizar Descripción
                </Button>
              </td>
              <td className={moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").isBefore(moment(), "minute") ? "text-danger" : ""}>
                {moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").format("dddd DD-MM-YYYY, HH:mm")}
              </td>
              <td className={`text-center ${moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").isBefore(moment(), "minute") ? "text-danger" : ""}`}>
                {moment(visit.fecha_hora_visita_terreno, "YYYY-MM-DD HH:mm:ss").startOf("minute").fromNow()}
              </td>
              <td>
                <div className="button-group">

                  <Button className="btn btn-info" onClick={() => modifyElement(visit._id)}>
                  <FontAwesomeIcon icon={faPencilAlt} /> Modificar
                  </Button>
                  <Button className="btn btn-danger" onClick={() => deleteElement(visit._id)}>
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar esta visita?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Visita eliminada</Modal.Title>
        </Modal.Header>
        <Modal.Body>La visita ha sido eliminada correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={visitIdToShowDescription !== null} onHide={() => setVisitIdToShowDescription(null)}> {/* Modal para mostrar la descripción */}
        <Modal.Header closeButton>
          <Modal.Title>Descripción de la visita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {visits.find(visit => visit._id === visitIdToShowDescription)?.descripcion}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVisitIdToShowDescription(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/visitas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  let visits = await res.json();
  return {
    props: { defaultVisits: visits.data }
  };
}

export default Visitas;
