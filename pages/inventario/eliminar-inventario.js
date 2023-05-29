import { Button, Modal } from "react-bootstrap";
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
    window.location.href = `/eventos/modificar-inventario?id=${id}`;
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
      <h1>Lista de inventario</h1>
      <div className="search-container">
        <h2>Búsqueda de inventario</h2>
        <div className="search-input">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="excel" variant="success" onClick={downloadExcel}>
            Descargar Excel
          </Button>
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr key={0}>
            <th style={{ width: "5%" }}>Nº</th>
            <th style={{ width: "15%" }}>Nombre</th>
            <th style={{ width: "15%" }}>Cantidad</th>
            <th style={{ width: "5%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedInventary?.map((inventary, index) => (
            <tr key={inventary._id}>
              <td>{index + 1}</td>
              <td>{inventary.nombre}</td>
              <td>{inventary.cantidad}</td>
              <td>
                <div className="button-group">
                  <Button className="btn btn-info " onClick={() => modifyElement(inventary._id)}>
                    <FontAwesomeIcon icon={faPencilAlt} /> Modificar
                  </Button>
                  <Button
                    className="btn btn-danger "
                    onClick={() => deleteElement(inventary._id, inventary.nombre)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Elemento de inventario eliminado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se ha eliminado "{elementName}" correctamente.</Modal.Body>
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
          ¿Estás seguro de que deseas eliminar el elemento "{elementName}"?
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
