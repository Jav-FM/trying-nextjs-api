import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  buildFeedbackPath,
  getActualFeedback,
} from "../../../helpers/feedbackHelpers";

//El habler recibe todas las consultas hechas a la ruta /api/feedback
const handler = (req, res) => {
  const buildedPath = buildFeedbackPath();
  const actualFeedback = getActualFeedback(buildedPath);

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
    actualFeedback.push(newFeedback);
    fs.writeFileSync(buildFeedbackPath(), JSON.stringify(actualFeedback));
    //Entregamos la respuesta de éxito al cliente
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else if (req.method === "GET") {
    res.status(200).json({ feedback: actualFeedback });
  } else {
    res.status(404);
  }
};

export default handler;
