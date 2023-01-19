import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

//El habler recibe todas las consultas hechas a la ruta /api/feedback
const handler = (req, res) => {
  //Ruta donde almacenamos nuestros feedbacks simulando una DB
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  //Usamos fs para adquirir la data actual almacenada en la "DB" ficticia
  const actualFileData = fs.readFileSync(filePath);
  //Identificamos qué tipo de request se recibió (en este caso estamos manejando POST)
  if (req.method === "POST") {
    //Obtenemos la data enviada en el body
    const { email, feedback } = req.body;

    //Preparamos el objeto que almacenaremos
    const newFeedback = {
      id: uuidv4().slice(0, 8),
      email,
      feedback,
    };
    //Usamos fs (propio de Node) para alterar y reescribir la data existente en un archivo json
    const parsedActualFileData = JSON.parse(actualFileData);
    parsedActualFileData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(parsedActualFileData));
    //Entregamos la respuesta de éxito al cliente
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else if (req.method === "GET") {
    res.status(200).json({ feedback: actualFileData });
  } else {
    res.status(404);
  }
};

export default handler;
