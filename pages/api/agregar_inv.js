import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");

	switch (req.method) {
		case "POST":
			const {
				tipo_evento,
				nombre_cliente,
				cantidad,
				estado,
				descripcion,
		} = req.body; //Ejemplo de campos del objeto enviado
				if(tipo_evento === "inventario"){
					const cantidadEntera = parseInt(cantidad);
					const miEvento = await db.collection("Inventario").insertOne({
                        nombre: nombre_cliente,
                        cantidad: cantidadEntera,
						estado: descripcion
					  });
					  res.json({ status: 200, data: miEvento });
				}
			break;
	}
}