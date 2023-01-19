import { useRouter } from "next/router";
import {
  buildFeedbackPath,
  getActualFeedback,
} from "../../helpers/feedbackHelpers";
import { Fragment, useState } from "react";

const FeedbackPage = ({ feedbackItems }) => {
  const router = useRouter();
  const [actualId, setActualId] = useState();
  const [feedbackDetail, setFeedbackDetail] = useState();

  const handleGoBack = () => {
    router.push("/");
  };

  const handleShowDetails = (id) => {
    if (id === actualId) {
      setActualId();
      setFeedbackDetail();
    } else {
      setActualId(id);
      fetch(`/api/feedback/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFeedbackDetail(data.feedback);
        });
    }
  };

  return (
    <div>
      <h1>Feedback using Static Props</h1>
      <ul>
        {feedbackItems &&
          feedbackItems.map((item) => (
            <Fragment>
              <li key={item.id}>
                {item.feedback}{" "}
                <button onClick={() => handleShowDetails(item.id)}>
                  {actualId === item.id ? "Hide " : "Show "} Details
                </button>
              </li>
              {actualId && feedbackDetail && actualId === item.id && (
                <div>
                  <p>Id: {item.id}</p>
                  <p>Email: {item.email}</p>
                </div>
              )}
            </Fragment>
          ))}
      </ul>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export const getStaticProps = async () => {
  //Dado que este código se ejecuta en el mismo servidor que nuestra API y nuestros helpers,
  // basta con importar acá las funciones y ejecutarlas sin una consulta http de por medio.
  const buildedPath = buildFeedbackPath();
  const actualFeedback = getActualFeedback(buildedPath);
  return {
    props: {
      feedbackItems: actualFeedback,
    },
  };
};

export default FeedbackPage;
