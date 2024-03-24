import { useEffect, useState, useContext } from "react";
import QuestionAns from "./component/QuestionAns";
import axios from "axios";
import { StudentContext } from "../contextCalls/studentContext/StudentContext";

function ViewResultDetail() {
  const { user } = useContext(StudentContext);
  const [attemptData, setAttemptData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = user;
        const { token } = userDetails;
        const params = new URLSearchParams(window.location.search);
        const questionFormId = params.get("formId");
        const attemptId = params.get("attemptId");

        const response = await axios.get(`http://localhost:8800/exams/questionforms/${questionFormId}/attempts/${attemptId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('resp data viewForm - ',response.data)
        setAttemptData(response.data);
      } catch (error) {
        console.error("Error fetching attempt data:", error);
      }
    };
    fetchData();
  }, [user]);

  if (!attemptData) {
    return (
      <span className="text-lg pr-16 text-blue-500 w-full h-screen flex justify-center items-center">
        No Responses Yet
      </span>
    );
  }

  const { form, report } = attemptData;
  const { title, timeDuration, questions } = form;

  return (
    <div className="flex flex-col justify-center items-center relative pb-32">
      <div className="w-3/4">
        <p className="h-10 text-lg font-semibold mt-5" style={{ border: "2px solid transparent" }}>
          {title}
        </p>
        <p className="h-6 text-base mb-10" style={{ border: "2px solid transparent" }}>
          Duration: {timeDuration} minutes
        </p>
        {questions.map((question, idx) => (
          <div key={idx}>
            <QuestionAns questionObj={question} answer={report.questions.find(ans => ans.question === question)?.attemptedAnswer} />
            <div>
              <p>Your Answer: {report.questions.find(ans => ans.question === question.question)?.attemptedAnswer}</p>
              <p>Correct Answer: {question.correctAnswer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default ViewResultDetail;
