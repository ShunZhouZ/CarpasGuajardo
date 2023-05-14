// import clientPromise from "../../lib/mongodb";
// import bcrypt from "bcryptjs";

// export default async function handler(req, res) {
//   const client = await clientPromise;
//   await client.connect();
//   const db = client.db("carpas-guajardo-db");

//   switch (req.method) {
//     case "POST":
//       let { username, password } = req.body;

//       // Buscar el usuario en la base de datos por su nombre de usuario
//       let user = await db.collection("usuarios").findOne({ username });

//       // Si el usuario no existe, devolver un error
//       if (!user) {
//         return res.status(401).json({ error: "Credenciales inválidas" });
//       }

//       // Comparar la contraseña ingresada con la almacenada en la base de datos
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);

//       // Si la contraseña es incorrecta, devolver un error
//       if (!isPasswordCorrect) {
//         return res.status(401).json({ error: "Credenciales inválidas" });
//       }

//       // Si la contraseña es correcta, devolver el usuario
//       res.status(200).json({ user });
//       break;

//     default:
//       res.setHeader("Allow", ["POST"]);
//       res.status(405).end(`Método ${req.method} no permitido`);
//   }
// }