import { authServiceFactory } from "../../services/authService"
import withSession from "../../lib/session";
import clientPromise from "../../lib/mongodb";
import jwt from "jsonwebtoken";

const authService = authServiceFactory();

export default withSession(async (req, res) => {
    const ERROR_CREDENTIALS = "Invalid username and/or password";

    const client = await clientPromise;
    await client.connect();
    const db = client.db("carpas-guajardo-db");

    const method = req.method.toLowerCase();
    const { username, password } = req.body;
    
    if (method !== "post") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        let userCredentials = await db.collection("usuarios").findOne({ username });
        if (await authService.validate(password, userCredentials.password) === true) {
            const token = jwt.sign( userCredentials, "super-secreta");
            await saveSession({username}, token, req);
            // console.log(token);
            res.status(200).json(token);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({error: ERROR_CREDENTIALS});
})

async function saveSession(user, token, request) {
    request.session.set("user", user);
    request.session.set("token", token);
    await request.session.save();
}