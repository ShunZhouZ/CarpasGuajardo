import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Contactos = (props) => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
  const { defaultContacts } = props;
  const [contacts, setContacts] = useState(defaultContacts);
  const [busqueda, setBusqueda] = useState("");
  const [contactosFiltrado, setContacsFiltrado] = useState(contacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmationClose = () => setShowConfirmation(false);

  const modifyElement = (id) => {
    window.location.href = `/contactos/modificar-contacto?id=${id}`;
  };

  const reloadContacts = useCallback(async () => {
    try {
      let res = await fetch("http://localhost:3000/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      let _contacts = await res.json();
      setContacts(_contacts.data);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
    }
  }, []);

  const deleteElement = (id) => {
    setContactIdToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const deleteResponse = await fetch(`http://localhost:3000/api/contacts?id=${contactIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      handleShow();
      handleConfirmationClose();

      // console.log(await deleteResponse.json());
      await reloadContacts();
      window.location.reload(); // Refrescar la página después de eliminar un contacto
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrarBusqueda(e.target.value);
  };
  
  const filtrarBusqueda = (terminoBusqueda) => {
    const resultado = contacts.filter((elemento) => {
      return elemento.nombre_cliente.toLowerCase().includes(terminoBusqueda.toLowerCase());
    });

    setContacsFiltrado(resultado);
  };

  useEffect(() => {
    reloadContacts();
  }, [reloadContacts]);

  return (
    <div style={{ marginLeft: "60px", marginRight: "60px" }}>
      <h1 className="display-3 text-center mb-5">Lista de contactos</h1>
      <div className="containerInput">
        <input className="form-control inputBuscar" value={busqueda} placeholder="Búsqueda por nombre" onChange={handleChange} />
        <Button className="btn btn-primary">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
      <div className="card-container">
        {contactosFiltrado.length > 0 ? (
          contactosFiltrado.map((contact, index) => (
            <Card key={contact._id} className="mb-3">
              <Card.Body>
                <div className="row">
                  <Row>
                    <Card.Title className="modal-title">
                      Contacto {index + 1}
                    </Card.Title>

                    <Col>
                      <Card.Text>
                        <strong>Nombre:</strong> {contact.nombre_cliente}
                      </Card.Text>
                      <Card.Text>
                        <strong>Telefono:</strong> {contact.numero_contacto_cliente}
                      </Card.Text>
                      <Card.Text>
                        <strong>Direccion:</strong> {contact.direccion_cliente}
                      </Card.Text>
                    </Col>

                    <Col>
                      <Card.Text>
                        <strong>Correo:</strong> {contact.correo}
                      </Card.Text>
                      <Card.Text>
                        <strong>Detalle:</strong> {contact.descripcion}
                      </Card.Text>
                    </Col>
                    <Col>
                      <div className="button-group">
                        <Button className="btn btn-info btn-sm" onClick={() => modifyElement(contact._id)}>
                          <FontAwesomeIcon icon={faPencilAlt} /> Modificar
                        </Button>

                        <Button className="btn btn-danger btn-sm" onClick={() => deleteElement(contact._id)}>
                          <FontAwesomeIcon icon={faTrash} /> Eliminar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <br></br>
                <div className="button-group"></div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h4>No hay resultados</h4>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contacto eliminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El contacto ha sido eliminado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este contacto?</Modal.Body>
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
  try {
    let res = await fetch("http://localhost:3000/api/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let contacts = await res.json();
    return {
      props: { defaultContacts: contacts.data }
    };
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    return {
      props: { defaultContacts: [] }
    };
  }
}

export default Contactos;
