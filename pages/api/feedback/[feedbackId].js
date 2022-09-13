import { buildFeedbackPath, extractFeedback } from "./index";

function handler(req, res) {
  const feedbackID = req.query.feedbackId;
  const data = extractFeedback(buildFeedbackPath());

  const selectedFeedback = data.find((item) => item.id === feedbackID);

  res.status(200).json({ selectedFeedback });
}
export default handler;
