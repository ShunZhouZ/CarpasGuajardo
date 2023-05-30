import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");
	switch (req.method) {
		case "POST":
			let bodyObject = req.body;
			let User = await db.collection("usuarios").insertOne(bodyObject);
			res.json(User);
			break;
		case "GET":
			const allUser = await db.collection("usuarios").find({}).toArray();
			res.json({ status: 200, data: allUser });
			break;
		case "DELETE":
			const { id } = req.query;

			if (!id) {
				return res.status(200).send({
					message: "El id del objeto es obligatorio"
				});
			}

			const deleteUser = await db.collection("usuarios").deleteOne({ _id: new ObjectId(id.toString()) });

			return res.status(200).send({
				message: "Elemento eliminado exitosamente",
				query: id,
				response: deleteUser
			});
	}
}
