import { Card, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import fetch from "node-fetch";

const Eventos = (props) => {
  const { defaultEvents } = props;
  const [events, setEvents] = useState(defaultEvents);
  const [inventarios, setInventarios] = useState([]);

  const reloadEvents = async () => {
    let res = await fetch("http://localhost:3000/api/eventos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let _events = await res.json();
    const filteredEvents = _events.data.filter((event) => event.notificacion === true);
    setEvents(filteredEvents);
  };

  const reloadInventario = async () => {
    let res = await fetch("http://localhost:3000/api/Inventario", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let inventario = await res.json();
    const filteredInventario = inventario.data.filter((item) => item.notificacion === true);
    setInventarios(filteredInventario);
  };

  useEffect(() => {
    reloadEvents();
    reloadInventario();
  }, []);

  return (
    <div>
      <h1 className="display-3 text-center mb-5">Notificaciones</h1>
      <Container>
        <Row>
          <Col md={6}>
            <div className="whatsapp-column">
              <h2 className="mb-4">Evento</h2>
              <div className="card-container event-scroll-container">
                {events.map((event, index) => (
                  <Card key={event._id} className="mb-4">
                    <Card.Body>
                      <div className="row">
                        <Row>
                          <Card.Title className="modal-title mb-3">
                            Evento {index + 1}
                          </Card.Title>
                        </Row>
                        <Row>
                          <Col>
                            <Card.Text>
                              <strong>Nombre: </strong> {event.nombre_cliente}
                            </Card.Text>
                            <Card.Text>
                              <strong>Estado de notificación: </strong>{" "}
                              {event.notificacion ? "Agendado" : "Sin notificación"}
                            </Card.Text>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <div className="button-group"></div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="whatsapp-column">
              <h2 className="mb-4">Inventario</h2>
              <div className="card-container inventory-scroll-container">
                {inventarios.map((inventario, index) => (
                  <Card key={inventario._id} className="mb-4">
                    <Card.Body>
                      <div className="row">
                        <Row>
                          <Card.Title className="modal-title mb-3">
                            Inventario {index + 1}
                          </Card.Title>
                        </Row>
                        <Row>
                          <Col>
                            <Card.Text>
                              <strong>Nombre: </strong> {inventario.nombre}
                            </Card.Text>
                            <Card.Text>
                              <strong>Estado de notificación: </strong>{" "}
                              {inventario.notificacion ? "Agendado" : "Sin notificación"}
                            </Card.Text>
                          </Col>
                        </Row>
                      </div>
                      <br />
                      <div className="button-group"></div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
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
