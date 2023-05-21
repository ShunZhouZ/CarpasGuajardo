import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import express from "express"

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // si el servidor de correo admite STARTTLS, establece esta opción en false
    auth: {
        user: 'keshawn.hahn@ethereal.email',
        pass: 'VKxbAKrhWSnVDT8h8j'
    },
});
  
// Función para enviar el correo electrónico
async function enviarCorreoElectronico(destinatario, asunto, cuerpo) {
    const mensaje = {
      from: "cguajardo-bot",
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };
  
    await transporter.sendMail(mensaje, (error, info) => {
        if(error){
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado");
            res.status(200).jsonp(req.body);
        }

    });
    
}

function generarContrasena(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres.charAt(indice);
    }
  
    return contrasena;
}
  

export default async function handler(req, res) {
  const client = await clientPromise;
  await client.connect();
  const db = client.db("carpas-guajardo-db");
  const users = db.collection("usuarios");

  if (req.method === "POST") {
    const { username, correo} = req.body;

    try {
      // const client = new MongoClient(uri);   

      // Verificar si el usuario existe en la base de datos
      let existingUser = await db.collection("usuarios").findOne({ username });
      if (existingUser) {
        if (existingUser.correo === correo) {
            // enviar correo electronico con nueva contraseña
            // enviar correo electrónico con nueva contraseña
            // función para generar una nueva contraseña
            const nuevaContrasena = generarContrasena(8); 
            const asunto = "Contraseña restablecida CarpasGuajardo";
            const cuerpo = `Se ha restablecido la contraseña en CarpasGuajardo, para acceder, utilice su RUT y la siguiente contraseña: ${nuevaContrasena}`;
            await enviarCorreoElectronico(existingUser.correo, asunto, cuerpo);
            const filter = { username: username };
            const options = { upsert: false };

            const updatePassword = {
                $set: {
                    password: await bcrypt.hash(nuevaContrasena, 10)
                },
            };

            const result = await users.updateOne(filter, updatePassword, options);
            return res.status(200).json({ message: "Contraseña restablecida correctamente" });

        }
        else {
            return res.status(409).json({ error: "No coinciden correo y usuario"});
        }
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al solicitar nueva contraseña" });
    } finally {
        client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
