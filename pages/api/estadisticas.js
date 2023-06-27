import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");
	switch (req.method) {
		case "GET":
			const allEventos = await db.collection("evento").find({}).toArray();
			let total = 0;
			let eventosMes = 0;
			let fechaActual = new Date();
			let mesActual = fechaActual.getMonth() + 1;
			let anioActual = fechaActual.getFullYear();
			let diaActual = fechaActual.getDate();
			allEventos.forEach((evento) => {
				let fechaEvento = new Date(evento.fecha_inicio);
				let diaEvento = fechaEvento.getDate();
				let mesEvento = fechaEvento.getMonth() + 1;
				let anioEvento = fechaEvento.getFullYear();
				if (mesEvento === mesActual && anioEvento === anioActual) {
					eventosMes++;

					if (diaEvento <= diaActual) {
						const int_ganacias = parseInt(evento.monto_total);
						total += int_ganacias;
					}
				}
			});
			const ganancias = total.toLocaleString("de-DE");
			return res.status(200).send({
				message: "Estadisticas",
				eventosMes: eventosMes,
				ganancias: ganancias
			});
	}
}
