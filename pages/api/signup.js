import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const client = await clientPromise;
  await client.connect();
  const db = client.db("carpas-guajardo-db");

  if (req.method === "POST") {
    let { username, password, nombre, correo, contacto} = req.body;

    try {
      // const client = new MongoClient(uri);   

      // Verificar si el usuario ya existe en la base de datos
      let existingUser = await db.collection("usuarios").findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: "El nombre de usuario ya está en uso" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario
      const newUser = {
        username,
        password: hashedPassword,
        nombre,
        correo,
        contacto,
        rol : "trabajador"
      };

      // Insertar el nuevo usuario en la base de datos
      let result = await db.collection("usuarios").insertOne( newUser );

      res.status(201).json({ message: "Agregado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el trabajador" });
    } finally {
      client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}

