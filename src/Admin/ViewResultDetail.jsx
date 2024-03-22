import { useEffect, useState } from "react";
import QuestionAns from "./component/QuestionAns";
import {
  getForm,
  getResponseIdx,
  setResponseIdx,
} from "../store/slices/viewSubmissions";
import { useDispatch, useSelector } from "react-redux";

function viewResultDetail() {
  const form = useSelector(getForm);
  const responseIdx = useSelector(getResponseIdx);

  const [idx, setIdx] = useState(responseIdx + 1);
  const dispatch = useDispatch();
  const { title, description, questions, ansForms } = form;
  const answers = ansForms[responseIdx];

  useEffect(() => {
    if (idx) {
      if (0 < idx && idx <= ansForms.length) {
        dispatch(setResponseIdx(idx - 1));
      } else {
        dispatch(setResponseIdx(0));
        setIdx(1);
      }
    }
  }, [idx, ansForms.length, dispatch]);

  if (form.ansForms.length === 0) {
    return (
      <span
        className="text-lg pr-16 text-blue-500 w-full h-screen
       flex justify-center items-center"
      >
        No Responses Yet
      </span>
    );
  }

  function calcWidth(s) {
    const w = (10 * s.toString().length).toString();
    return w;
  }

  return (
    <div className=" flex flex-col justify-center items-center relative pb-32">
      <div className="w-3/4">
        <p
          className="h-10  text-lg  font-semibold mt-5"
          style={{ border: "2px solid transparent" }}
        >
          {title}
        </p>
        {description && (
          <p
            className="h-6 text-base mb-10"
            style={{ border: "2px solid transparent" }}
          >
            {description}
          </p>
        )}
        {questions.map((question, idx) => {
          return (
            <div key={idx}>
              <QuestionAns
                questionObj={question}
                answer={answers[idx]}
              />
              <div>
                <p>Your Answer: {answers[idx]}</p>
                <p>Correct Answer: {question.correctAnswer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default viewResultDetail;
