import { useCallback, useState } from "react";
import moment from 'moment';



const Visitas = (props) => {
    const { defaultVisits } = props
    const [visits, setVisits] = useState(defaultVisits)

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

        console.log(await deleteResponse.json());
        await reloadVisits()
    }
    return (
        <div>
            <h1>Eliminar Visita tecnica</h1>
            <table className="table table-striped">
                <thead>
                    <tr key={0}>
                        <th style={{ width: "25%" }}>Titulo evento</th>
                        <th style={{ width: "25%" }}>Inicio</th>
                        <th style={{ width: "25%" }}>Fin</th>
                        <th style={{ width: "25%" }}>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visits?.map((visit, index) => (
                            <tr key={visit._id}>
                                <td>{visit.title}</td>
                                <td>{moment(visit.start).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>{moment(visit.end).format('DD/MM/YYYY hh:mm:ss')}</td>
                                <td>{visit.id_Cliente}</td>
                                <td>
                                    <Button className="btn btn-danger" onClick={() => deleteElement(visit._id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
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