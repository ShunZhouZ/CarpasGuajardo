import withSession from "../../lib/session";
import jwt from "jsonwebtoken";

export default withSession(async (req, res) => {
	const user = req.session.get("user");
	const token = req.session.get("token");
	
	if (user) {
		const tokenDecoded = jwt.decode(token).rol;
		const username = jwt.decode(token).nombre;
		// console.log(token);
		// in a real world application you might read the user id from the session and then do a database request
		// to get more information on the user if needed
		// console.log(tokenDecoded);
		// console.log("User found");
		res.json({
			isLoggedIn: true,
			rol: tokenDecoded,
			nombre: username,
			...user
		});
	} else {
		// console.log("No user found");
		res.json({
			isLoggedIn: false
		});
	}
});
