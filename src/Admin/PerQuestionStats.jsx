import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getForm,
  getOptionsFreq,
  getQuestionIdx,
  setQuestionIdx,
} from "../store/slices/viewSubmissions";
import ShowCharts from "./component/ShowCharts";

function PerQuestionStats() {
  const form = useSelector(getForm);
  const { questions, ansForms } = form;
  //const { questions } = form;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const questionIdx = useSelector(getQuestionIdx);
  const freq = useSelector(getOptionsFreq(questionIdx));
  const currentQuestion = questions[questionIdx];
  const dispatch = useDispatch();

  // const ansForms = [
  //   {
  //     0: "Sample answer to question 1",
  //     1: "Sample answer to question 2",
  //     2: ["Option 1", "Option 3"],
  //   },
  //   {
  //     0: "Another sample answer to question 1",
  //     1: "Another sample answer to question 2",
  //     2: ["Option 2", "Option 4"],
  //   },
  // ];


  if (form.ansForms.length === 0) {
    return (
      <span className="text-lg pr-16 text-blue-500 w-full h-screen flex justify-center items-center">
        No Responses Yet
      </span>
    );
  }

  return (
    <div className=" flex flex-col justify-center text-base items-center relative pb-16">
      <div className="w-3/4">
        <div className="relative">
          <button
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="bg-blue-700 w-3/4 text rounded-md mt-20 hover:bg-blue-00"
          >
            <div className="flex justify-between items-center transition-all duration-300 ease-in-out">
              <span className="text-base" style={{width:"900px"}}>
                {questionIdx + 1}. {currentQuestion.question}
              </span>
              <span className="text-lg ">
                <AiOutlineDown />
              </span>
            </div>
          </button>

          {isSelectOpen && (
            <div className="border-2 border-blue-900 max-h-45 rounded-md overflow-y-auto fixed"
            style={{
              left: "50%",
              marginRight:"60px",
              marginTop:"0px"
            }}>
              {questions.map((questionObj, idx) => {
                return (
                  <div
                    onClick={() => {
                      dispatch(setQuestionIdx(idx));
                      setIsSelectOpen(false);
                    }}
                    key={idx}
                    className="p-2 cursor-pointer bg-blue-200 text-slate-100 text-base hover:bg-blue-300 "
                  >
                    {idx + 1}. {questionObj.question}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-3/4 flex flex-col gap-2 my-3">
        {(currentQuestion.type === "short-ans" ||
          currentQuestion.type === "long-ans") &&
          ansForms.map((ansForm, idx) => {
            return (
              <div
                className=" py-3 text-base bg-white rounded-lg shadow-md"
                key={idx}
              >
                {ansForm[questionIdx] ? (
                  <p className="p-3">{ansForm[questionIdx]}</p>
                ) : (
                  <p className="p-3 text-gray-500 italic">
                    Question left blank
                  </p>
                )}
              </div>
            );
          })}
      </div>

      {currentQuestion.type === "multiple-choice" && (
        <ShowCharts
          labels={currentQuestion.options}
          answersFreq={freq}
          chartLabel={currentQuestion.question}
        />
      )}

      {currentQuestion.type === "check-boxes" && (
        <ShowCharts
          labels={currentQuestion.options}
          answersFreq={freq}
          chartLabel={currentQuestion.question}
        />
      )}

      {currentQuestion.type === "dropdown" && (
        <ShowCharts
          labels={currentQuestion.options}
          answersFreq={freq}
          chartLabel={currentQuestion.question}
        />
      )}

      <div className="flex justify-center items-center gap-4  fixed bottom-8 bg-blue-300 p-2 rounded-full ">
        <button
          disabled={questionIdx === 0}
          onClick={() => dispatch(setQuestionIdx(questionIdx - 1))}
          className={`px-2 py-1 text-base font-bold rounded-full ${
            questionIdx === 0
              ? "text-black bg-blue-50 "
              : "text-white  bg-blue-500 hover:ring-8"
          }  ring-blue-300 transition-all duration-300 ease-in-out border-1 border-blue-500`}
        >
          &larr;
        </button>
        <span className="text-base text-white font-bold">
          {questionIdx + 1} / {questions.length}
        </span>
        <button
          disabled={questionIdx === questions.length - 1}
          onClick={() => dispatch(setQuestionIdx(questionIdx + 1))}
          className={`px-2 py-1 text-base font-bold rounded-full ${
            questionIdx === questions.length - 1
              ? "text-black bg-blue-50 "
              : "text-white  bg-blue-500 hover:ring-8"
          }  ring-blue-300 transition-all duration-300 ease-in-out border-1 border-blue-500`}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

export default PerQuestionStats;
