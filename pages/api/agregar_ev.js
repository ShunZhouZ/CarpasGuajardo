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
				fecha_hora_visita_terreno,
				fecha_inicio,
				fecha_termino,
				monto_total,
				anticipo,
				carpa,
				toldo,
				cubre_piso,
				Iluminacion,
				calefaccion,
				metros_cuadrados,
				descripcion,
				estado,
				notificacion			} = req.body; //Ejemplo de campos del objeto enviado
				if(tipo_evento === "Evento"){
					const miEvento = await db.collection("evento").insertOne({
						nombre_cliente: nombre_cliente,
						numero_contacto_cliente: numero_contacto_cliente,
						direccion_cliente: direccion_cliente,
						fecha_inicio: new Date (fecha_inicio),
						fecha_termino: new Date (fecha_termino),
						monto_total: monto_total,
						anticipo: anticipo,
						cubre_piso: cubre_piso,
						carpa: carpa,
						toldo: toldo,
						Iluminacion: Iluminacion,
						calefaccion: calefaccion,
						metros_cuadrados: metros_cuadrados,
						descripcion: descripcion,
						estado: estado,
						notificacion: notificacion,
					  });
					  res.json({ status: 200, data: miEvento });
				}else{
					const miEvento = await db.collection("visita_terreno").insertOne({
						nombre_cliente: nombre_cliente,
						numero_contacto_cliente: numero_contacto_cliente,
						direccion_cliente: direccion_cliente,
						fecha_hora_visita_terreno: new Date (fecha_hora_visita_terreno),
						descripcion: descripcion,
					  });
					  res.json({ status: 200, data: miEvento });
				}
			break;
		case "GET":
			const allEventos = await db.collection("ff").find({}).toArray();
			res.json({ status: 200, data: allEventos });
			break;
	}
}