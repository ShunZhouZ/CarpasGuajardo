import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const Inventario = (props) => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [elementName, setElementName] = useState("");
  const [elementIdToDelete, setElementIdToDelete] = useState(null);
  const { defaultInventarios } = props;
  const [inventario, setInventarios] = useState(defaultInventarios);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirmationClose = () => setShowConfirmation(false);

  const modifyElement = (id) => {
    window.location.href = `/inventario/modificar-inventario?id=${id}`;
  };

  const deleteElement = async (id, nombre) => {
    setElementName(nombre);
    setElementIdToDelete(id);
    setShowConfirmation(true);
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

    // console.log(await deleteResponse.json());
    // await reloadInventarios();
  };

  return (
    <div style={{ marginLeft: "60px", marginRight: "60px" }}>
      <h1 className="display-3 text-center mb-5">Lista de inventario</h1>
      <div className="card-container">
        <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
          {inventario?.map((inventary, index) => (
            <Col key={inventary._id}>
              <Card className="mb-3">
                <Card.Body>
                  <div className="row">
                    <Card.Title className="modal-title">
                      {inventary.nombre}
                    </Card.Title>
                    <Col>
                      <Card.Text>
                        <strong>Cantidad:</strong> {inventary.cantidad}
                      </Card.Text>
                    </Col>
                  </div>
                  <br />
                  <div className="button-group"></div>
                  <div className="mt-auto">
                    <Button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => modifyElement(inventary._id)}
                    >
                      Modificar
                    </Button>
                    <Button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteElement(inventary._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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
