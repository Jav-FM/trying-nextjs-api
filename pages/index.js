import { Inter } from "@next/font/google";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

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
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}
