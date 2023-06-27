import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");

	switch (req.method) {
		case "POST":
			const {
				tipo_evento,
				nombre_cliente,
				numero_contacto_cliente,
				direccion_cliente,
				metros_cuadrados,
				descripcion
		} = req.body; //Ejemplo de campos del objeto enviado
				if(tipo_evento === "contacto"){
					console.log("entre a evento");
					const miEvento = await db.collection("contacto").insertOne({
                        nombre_cliente: nombre_cliente,
                        numero_contacto_cliente: numero_contacto_cliente,
                        direccion_cliente: direccion_cliente,
                        correo: metros_cuadrados,
                        descripcion: descripcion,

					  });
					  res.json({ status: 200, data: miEvento });
				}
			break;
	}
}