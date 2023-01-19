import {
  buildFeedbackPath,
  getActualFeedback,
} from "../../../helpers/feedbackHelpers";

const handler = (req, res) => {
  //identificar el valor dinamico:
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = getActualFeedback(filePath);
  const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);
  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
