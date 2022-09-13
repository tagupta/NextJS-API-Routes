import fs from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const feedbackBody = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(feedbackBody);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!!", feedback: feedbackBody });
  } else {
    const data = extractFeedback(buildFeedbackPath());
    res.status(200).json({ feedback: data });
  }
}

export default handler;
