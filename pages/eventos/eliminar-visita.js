import { Button, Modal } from "react-bootstrap";
import { useCallback, useState, useEffect } from "react";
import moment from 'moment';



const Visitas = (props) => {
    const { defaultVisits } = props
    const [visits, setVisits] = useState(defaultVisits)

    const [showModal, setShowModal] = useState(false); // agregamos un estado para el modal

    const reloadVisits = useCallback(async () => {
        let res = await fetch("http://localhost:3000/api/visitas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let _visits = await res.json()
        setVisits(_visits.data)
    }, [])

    const deleteElement = async (id) => {
        const deleteResponse = await fetch(`http://localhost:3000/api/visitas?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        // mostramos el modal cuando se ha eliminado correctamente la visita
        setShowModal(true);
        console.log(await deleteResponse.json());
        await reloadVisits()
    }
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <h1>Eliminar Visita tecnica</h1>
            <table className="table table-striped">
                <thead>
                    <tr key={0}>
                        <th style={{ width: "20%" }}>Nº</th>
                        <th style={{ width: "20%" }}>Nombre cliente</th>
                        <th style={{ width: "20%" }}>Contacto de cliente</th>
                        <th style={{ width: "20%" }}>Direccion de cliente</th>
                        <th style={{ width: "20%" }}>Fecha visita</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visits?.map((visit, index) => (
                            <tr key={visit._id}>
                                <td>{index + 1}</td>
                                <td>{visit.nombre_cliente}</td>
                                <td>{visit.numero_contacto_cliente}</td>
                                <td>{visit.direccion_cliente}</td>
                                <td>{moment(visit.fecha_hora_visita_terreno).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>
                                    <div className="button-group">
									<Button className="btn btn-danger" onClick={() => deleteElement(visit._id)}>Eliminar</Button>
									<Button className="btn btn-primary" /*</div>onClick={() => modifyElement(visit._id)}*/>Modificar</Button>
								</div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* modal para mostrar mensaje de eliminación exitosa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Visita eliminada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    La visita ha sido eliminada correctamente.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

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