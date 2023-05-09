import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");

	switch (req.method) {
		case "POST":
			let bodyObject = req.body;
			let miVisita = await db.collection("visitas").insertOne(bodyObject);
			res.json(miVisita);
			break;
		case "GET":
			const allVisitas = await db.collection("visitas").find({}).toArray();
			res.json({ status: 200, data: allVisitas });
			break;
		case "PUT":
			let bodyObject2 = req.body;
	}
}
