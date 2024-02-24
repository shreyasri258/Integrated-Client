import Options from "./Options";
import { useDispatch, useSelector } from "react-redux";
import {
  activateQuestion,
  deleteQuestionObj,
  getActiveInfo,
  updateQuestion,
} from "../../store/slices/newForm";
import { useState } from "react";
import SelectQuestionType from "../component/SelectQuestionType";
import { AiFillDelete } from "react-icons/ai";
import Switch from "../ui/Switch";

function Question({ questionObj, questionIdx }) {
  const { options, required, question, type } = questionObj;

  const dispatch = useDispatch();
  const active = useSelector(getActiveInfo);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const isQuestionActive = active.questionIdx === questionIdx;
  const hasOptions =
    type === "multiple-choice" || type === "check-boxes" || type === "dropdown";

  return (
    <div
      className={`flex flex-col  bg-white rounded-md p-2  mt-3 ${
        isQuestionActive
          ? "border-l-8 border-l-indigo-500 border-y-2 border-y-indigo-300 border-r-2 border-r-indigo-300 transition-all duration-400 ease-in-out"
          : "border-2 border-indigo-300 transition-all duration-300 ease-in-out"
      } `}
      key={questionObj.id}
      onClick={() => dispatch(activateQuestion(questionIdx))}
    >
      <div className="p-2 flex flex-row justify-between">
        {isQuestionActive ? (
          <input
            className="h-9 w-3/4 text-base focus:outline-none focus:border-b-2 border-indigo-500 "
            placeholder="Please Enter Question"
            value={question}
            onChange={(e) => {
              dispatch(
                updateQuestion({ questionIdx, question: e.target.value })
              );
            }}
          />
        ) : (
          <p className="text-base border-0">
            {question || (
              <span className="text-slate-400">Please Enter Question</span>
            )}
            {question && required && (
              <span className="text-rose-500 px-1">*</span>
            )}
          </p>
        )}

        <div className="">
          {isQuestionActive && (
            <SelectQuestionType
              questionIdx={questionIdx}
              isSelectOpen={isSelectOpen}
              setIsSelectOpen={setIsSelectOpen}
              type={type}
            />
          )}
        </div>
      </div>

      <div className="px-2 pb-3 flex justify-between flex-col">
        <div className="">
          {type === "short-ans" && (
            <p className="text-base underline underline-offset-2 text-slate-400 decoration-slate-300">
              Short answer text
            </p>
          )}

          {type === "long-ans" && (
            <p className="text-base underline underline-offset-2 text-slate-400 decoration-slate-300">
              Long answer text
            </p>
          )}

          {hasOptions && (
            <Options type={type} options={options} questionIdx={questionIdx} />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        {isQuestionActive && (
          <div className="flex gap-2">
            <div className="flex items-center p-6 gap-4 ">
              <span className="text-base text-slate-400">Required</span>
              <Switch
                questionIdx={questionIdx}
                startState={required}
                type={"toggleRequired"}
              />
            </div>

            <div className="flex items-center  ">
              <button
                className=" p-3.5 rounded-full hover:bg-slate-100 transition-all duration-300 ease-in-out"
                onClick={() => dispatch(deleteQuestionObj(questionIdx))}
              >
                <AiFillDelete fontSize={"1.5rem"} color="rgb(100 116 139)" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
