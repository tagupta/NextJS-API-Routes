import { useRef, useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    //send data in req for precessing: {email: "some email", feedback: "Some feedback here"}
    const reqBody = {
      email,
      feedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleFetch = () => {
    router.push("/feedback");
    // fetch("/api/feedback")
    //   .then((response) => response.json())
    //   .then((data) => setFeedbackList(data.feedback));
  };

  return (
    <div className="home">
      <h2>This is a home page</h2>
      <form className="form" onSubmit={submitHandler}>
        <div className="controls">
          <div className="control">
            <label htmlFor="email">Your email Address</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className="control">
            <label htmlFor="feedback">Your feedback</label>
            <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
          </div>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button className="btn" onClick={handleFetch}>
        Get All feedbacks
      </button>
    </div>
  );
};

export default HomePage;
