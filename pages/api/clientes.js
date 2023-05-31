import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");

	switch (req.method) {
		case "POST":
			let bodyObject = req.body;
			let miEvento = await db.collection("cliente").insertOne(bodyObject);
			res.json(miEvento);
			break;
		case "GET":
			const allEventos = await db.collection("cliente").find({}).toArray();
			res.json({ status: 200, data: allEventos });
			break;
		case "PUT":
			const { body } = req;
			const { _id, ...data } = body;
			const responseUpdate = await db.collection("cliente").updateOne(
				{
					_id: new ObjectId(_id)
				},
				{
					$set: data
				}
			);
			return res.status(200).send({
				message: "Modificado",
				response: responseUpdate
			});
	}
}
