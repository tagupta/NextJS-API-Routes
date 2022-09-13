import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

export async function getStaticProps() {
  // const response = await fetch("http://localhost:3000/api/feedback");
  // const data = await response.json();
  // const feedbackList = data.feedback;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackList: data,
    },
  };
}

const FeedbackList = ({ feedbackList }) => {
  const handleFeedbackDetails = async (id) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();
    const item = data.selectedFeedback;
    console.log("Details: ", item);
  };

  return (
    <div className="home">
      <h1>Feedback History</h1>
      <div className="feedbackList">
        <ul>
          {feedbackList.map((item) => (
            <li key={item.id} className="listItem">
              {item.email} - {item.feedback}
              <button onClick={(event) => handleFeedbackDetails(item.id)}>
                More Details
              </button>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackList;
