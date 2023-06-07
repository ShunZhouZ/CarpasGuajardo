import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const Inventario = (props) => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [elementName, setElementName] = useState("");
  const [elementIdToDelete, setElementIdToDelete] = useState(null);
  const { defaultInventarios } = props;
  const [inventario, setInventarios] = useState(defaultInventarios);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmationClose = () => setShowConfirmation(false);

  const modifyElement = (id) => {
    window.location.href = `/inventario/modificar-inventario?id=${id}`;
  };

  const reloadInventarios = useCallback(async () => {
    let res = await fetch("http://localhost:3000/api/Inventario", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let _inventario = await res.json();
    setInventarios(_inventario.data);
  }, []);

  const deleteElement = async (id, nombre) => {


    if (confirmDelete) {
      setElementName(nombre);
      setElementIdToDelete(id);
      setShowConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    const deleteResponse = await fetch(
      `http://localhost:3000/api/Inventario?id=${elementIdToDelete}`,
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
    await reloadInventarios();
  };

  const filterInventary = () => {
    const filtered = inventario.filter(
      (inventary) =>
        inventary.nombre
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
  };

  const filteredInventary = filterInventary();

  const sortedInventary = filteredInventary.sort((a, b) => {
    const dateA = moment(a.fecha_inicio);
    const dateB = moment(b.fecha_inicio);
    return sortAsc ? dateA - dateB : dateB - dateA;
  });

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedInventary);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");
    XLSX.writeFile(workbook, "inventario.xlsx");
  };


  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <h1 className="display-3 text-center mb-5">Lista de inventario</h1>
      <div className="card-container">
        {sortedInventary?.map((inventary, index) => (
          <Card key={inventary._id} className="mb-3">
            <Card.Body>
              <div className="row">
                <Row>
                  <Card.Title className="modal-title">
                    Elemento {index + 1}
                  </Card.Title>

                  <Col>
                    <Card.Text>
                      <strong>Nombre:</strong> {inventary.nombre}
                    </Card.Text>
                    <Card.Text>
                      <strong>Cantidad:</strong> {inventary.cantidad}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Button
                      className="btn btn-info btn-sm"
                      onClick={() => modifyElement(inventary._id)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} /> Modificar
                    </Button>
                    <br></br>
                    <br></br>
                    <Button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteElement(inventary._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </Button>
                  </Col>
                </Row>
              </div>
              <br></br>
              <div className="button-group">

              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Elemento de inventario eliminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha eliminado correctamente.</Modal.Body>
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
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el elemento?
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
  let res = await fetch("http://localhost:3000/api/Inventario", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let inventario = await res.json();
  return {
    props: { defaultInventarios: inventario.data },
  };
}

export default Inventario;
