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
	}
}
