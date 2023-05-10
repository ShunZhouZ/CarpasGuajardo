import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("carpas-guajardo-db");
    switch (req.method) {
        case "POST":
            let bodyObject = req.body;
            let miEvento = await db.collection("contacts").insertOne(bodyObject);
            res.json(miEvento);
            break;
        case "GET":
            const allEventos = await db.collection("contacts").find({}).toArray();
            res.json({ status: 200, data: allEventos });
            break;
        case "DELETE":
            const { id } = req.query

            if(!id){
                return res.status(200).send({
                    message: 'El id del objeto es obligatorio',
                })
            }

            const deleteEvento = await db.collection("contacts").deleteOne({_id: new ObjectId(id.toString())})

            return res.status(200).send({
                message: 'Elemento eliminado exitosamente',
                query: id,
                response: deleteEvento
            })
    }
}