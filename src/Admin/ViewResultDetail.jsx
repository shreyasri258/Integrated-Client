// ViewResultDetail.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StudentContext } from "../contextCalls/studentContext/StudentContext";
import UniversalNavbar from "../User/StudentUniversalNavbar";

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
    <>
    <UniversalNavbar/>
   
    <div className="flex flex-col justify-center items-center relative pb-32">
      <div style={{ width: "800px" }}>
        <p className="text-lg font-semibold mt-5 text-blue-500 text-center">
          {title}
        </p>
        <p className="text-base mb-10 text-blue-500 text-center">
          Duration: {timeDuration} minutes
        </p>
        {questions.map((question, idx) => {
          const attemptedAnswer = report.questions.find(ans => ans.question === question.question)?.attemptedAnswer;
          const isCorrect = attemptedAnswer === question.correctAnswer;
          const highlightColor = isCorrect ? "bg-green-200" : "bg-red-200";
          return (
            <div key={idx} className="p-4 mb-4 border-2">
              <p className="font-semibold">{question.question}</p>
              {question.options.map((option, index) => (
                <p key={index} className={`p-2 m-2 ${option === attemptedAnswer ? highlightColor : ""}`}>
                  {option}
                </p>
              ))}
              <div className={`p-2 m-2 ${highlightColor}`}>
                <p style={{ fontWeight: "bold", color: "#1E40AF" }}>Your Answer: </p>
                <p style={{ color: "#1E40AF" }}>{attemptedAnswer}</p>
              </div>
              <div className={`p-2 m-2 ${highlightColor}`}>
                <p style={{ fontWeight: "bold", color: "#1E40AF" }}>Correct Answer: </p>
                <p style={{ color: "#1E40AF" }}>{question.correctAnswer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default ViewResultDetail;
