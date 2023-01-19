import fs from "fs";
import path from "path";

//Ruta donde almacenamos nuestros feedbacks simulando una DB
export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

//Usamos fs para adquirir la data actual almacenada en la "DB" ficticia
export const getActualFeedback = (filePath) => {
  const actualFileData = fs.readFileSync(filePath);
  return JSON.parse(actualFileData);
};
