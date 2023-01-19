import { Inter } from "@next/font/google";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const formRef = useRef();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [loadedFeedback, setLoadedFeedback] = useState([]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;
    const newFeedbackBody = { email, feedback };
    //Para las consultas a la API dentro de la misma app, no es necesario indicar una url base.
    //Basta con iniciar con "/" y se dará por sentado que estamos haciendo la consulta a nuestro mismo dominio.
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(newFeedbackBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        formRef.current.reset();
      });
  };

  const handleLoadFeedback = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setLoadedFeedback(data.feedback));
  };

  const handleGoToFeedback = () => {
    router.push("/feedback");
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmitForm} ref={formRef}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} required />
        </div>
        <button>Send Feedback</button>
      </form>
      <button onClick={handleGoToFeedback}>
        Review feedbacks in another page
      </button>
      <button onClick={handleLoadFeedback}>Load feedbacks here</button>
      <ul>
        {loadedFeedback.map((feedback) => (
          <li key={feedback.id}>{feedback.feedback}</li>
        ))}
      </ul>
    </div>
  );
}
