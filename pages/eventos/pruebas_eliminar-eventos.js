import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Eventos = (props) => {
  const [show, setShow] = useState(false);
  const { defaultEvents } = props;
  const [events, setEvents] = useState(defaultEvents);
  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); //esto agregue para el sort
  const [filterToldo, setFilterToldo] = useState(false);
  const [filterCarpa, setFilterCarpa] = useState(false);
  const [filterIluminacion, setFilterIluminacion] = useState(false);

  const handleShowDescriptionModal = (description) => {
    setDescription(description);
    setShowDescriptionModal(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmationClose = () => setShowConfirmation(false);

  const modifyElement = (id) => {
    window.location.href = `/eventos/modificar-evento?id=${id}`;
  };

  const reloadEvents = useCallback(async () => {
    let res = await fetch("http://localhost:3000/api/eventos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let _events = await res.json();
    setEvents(_events.data);
  }, []);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const deleteElement = (id) => {
    setEventToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3000/api/eventos?id=${eventToDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    handleShow();
    handleConfirmationClose();

    console.log(await deleteResponse.json());
    await reloadEvents();
  };
  //se actualizo filterevents
  const filterEvents = () => {
    const filtered = events.filter((event) => {
      const nombreCliente = event.nombre_cliente.toLowerCase();
      const direccionCliente = event.direccion_cliente.toLowerCase();
      const numeroContactoCliente = event.numero_contacto_cliente.toLowerCase();
      const includesSearchTerm =
        nombreCliente.includes(searchTerm.toLowerCase()) ||
        direccionCliente.includes(searchTerm.toLowerCase()) ||
        numeroContactoCliente.includes(searchTerm.toLowerCase());

      const meetsToldoFilter = filterToldo ? event.toldo : true;
      const meetsCarpaFilter = filterCarpa ? event.carpa : true;
      const meetsIluminacionFilter = filterIluminacion
        ? event.Iluminacion
        : true;

      return (
        includesSearchTerm &&
        meetsToldoFilter &&
        meetsCarpaFilter &&
        meetsIluminacionFilter
      );
    });

    return filtered;
  };

  const handleToldoFilterChange = (event) => {
    setFilterToldo(event.target.checked);
  };

  const handleCarpaFilterChange = (event) => {
    setFilterCarpa(event.target.checked);
  };

  const handleIluminacionFilterChange = (event) => {
    setFilterIluminacion(event.target.checked);
  };

  //hasta acaba el filterevents

  const filteredEvents = filterEvents();

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = moment(a.fecha_inicio);
    const dateB = moment(b.fecha_inicio);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedEvents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Eventos");
    XLSX.writeFile(workbook, "eventos.xlsx");
  };

  return (
    <div className="container">
      <h1 className="display-3 text-center mb-5">Lista de eventos</h1>
      <div className="search-input">
        <div className="button-container">
          <input
            type="text"
            placeholder="Buscar por nombre, dirección o teléfono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="excel" variant="success" onClick={downloadExcel}>
            Descargar Excel
          </Button>

          <Button className="sort" variant="primary" onClick={handleSortOrder}>
            Ordenar {sortOrder === "asc" ? "descendente" : "ascendente"}
          </Button>
        </div>
        <div className="check-box">
          <label>
            <input
              type="checkbox"
              checked={filterToldo}
              onChange={handleToldoFilterChange}
            />
            Toldo
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterCarpa}
              onChange={handleCarpaFilterChange}
            />
            Carpa
          </label>
          <label>
            <input
              type="checkbox"
              checked={filterIluminacion}
              onChange={handleIluminacionFilterChange}
            />
            Iluminación
          </label>
        </div>
      </div>
      <div className="card-container">
        {sortedEvents.map((event, index) => (
          <Card key={event._id}>
            <Card.Body>
              <div className="row">
                <Row>
                  <Card.Title className="modal-title">
                    Evento {index + 1}
                  </Card.Title>

                  <Col>
                    <Card.Text>
                      <strong>Nombre:</strong> {event.nombre_cliente}
                    </Card.Text>
                    <Card.Text>
                      <strong>Telefono:</strong> {event.numero_contacto_cliente}
                    </Card.Text>
                    <Card.Text>
                      <strong>Direccion:</strong> {event.direccion_cliente}
                    </Card.Text>
                    <Card.Text>
                      <strong>Inicio evento:</strong>{" "}
                      {moment(event.fecha_inicio).format(
                        "dddd DD-MM-YYYY  HH:mm"
                      )}
                    </Card.Text>
                    <Card.Text>
                      <strong>Fin evento:</strong>{" "}
                      {moment(event.fecha_termino).format(
                        "dddd DD-MM-YYYY  HH:mm"
                      )}
                    </Card.Text>
                  </Col>

                  <Col>
                    <Card.Text>
                      <strong>
                        m<sup>2</sup>:
                      </strong>{" "}
                      {event.metros_cuadrados}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cubrepiso:</strong>{" "}
                      {event.cubre_piso ? "Si" : "No"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Carpa:</strong> {event.carpa ? "Sí" : "No"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Toldo:</strong> {event.toldo ? "Sí" : "No"}
                    </Card.Text>
                  </Col>

                  <Col>
                    <Card.Text>
                      <strong>Iluminación:</strong>{" "}
                      {event.Iluminacion ? "Sí" : "No"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Calefacción:</strong>{" "}
                      {event.calefaccion ? "Sí" : "No"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Monto total:</strong> {event.monto_total}
                    </Card.Text>
                    <Card.Text>
                      <strong>Abono:</strong> {event.anticipo}
                    </Card.Text>
                  </Col>
                </Row>
              </div>
              <br></br>
              <div className="button-group">
                <Button
                  className="btn btn-light btn-sm"
                  onClick={() => handleShowDescriptionModal(event.descripcion)}
                >
                  <FontAwesomeIcon icon={faEye} /> Visualizar Descripción
                </Button>
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => modifyElement(event._id)}
                >
                  <FontAwesomeIcon icon={faPencilAlt} /> Modificar
                </Button>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteElement(event._id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Evento eliminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El evento ha sido eliminado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDescriptionModal}
        onHide={() => setShowDescriptionModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Descripción del evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
      </Modal>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este evento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/eventos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let events = await res.json();
  return {
    props: { defaultEvents: events.data },
  };
}

export default Eventos;
