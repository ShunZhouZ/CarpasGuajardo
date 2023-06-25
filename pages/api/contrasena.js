import { faBaseballBall } from "@fortawesome/free-solid-svg-icons";
import withSession from "../../lib/session";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default withSession(async (req, res) => {
	const user = req.session.get("user");
	const client = await clientPromise;
	const db = client.db("carpas-guajardo-db");
	console.log(user);
	const user_const = user.username;

	switch (req.method) {
		case "GET":
			const userDatos = await db.collection("usuarios").find({ username: user_const }).toArray();
			res.json({ status: 200, data: userDatos });
			break;
		case "PUT":
			const { body } = req; // contraseña nueva
			const { nueva } = body;
			const hashedPassword = await bcrypt.hash(nueva, 10);
			const responseUpdate = await db.collection("usuarios").updateOne(
				{
					username: user_const
				},
				{
					$set: { password: hashedPassword }
				}
			);
			return res.status(200).send({
				message: "Modificada la contraseña",
				response: responseUpdate
			});
	}
});
