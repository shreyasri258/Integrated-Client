import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import {
  activateQuestion,
  deleteQuestionObj,
  updateQuestion,
  updateCorrectAnswer, // Import updateCorrectAnswer action
} from '../../store/slices/newForm';
import Switch from '../ui/Switch';
import Options from './Options';
import SelectQuestionType from './SelectQuestionType';

function Question({ questionObj, questionIdx }) {
  const dispatch = useDispatch();
  const { options, required, question, type, correctAnswer } = questionObj;
  const active = useSelector((state) => state.newForm.active);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const isQuestionActive = active.questionIdx === questionIdx;
  const hasOptions = ['multiple-choice', 'check-boxes', 'dropdown'].includes(type);

  const handleCorrectAnswerChange = (e) => {
    dispatch(updateCorrectAnswer({ questionIdx, correctAnswer: e.target.value }));
  };

  return (
    <div

      className={`flex flex-col  bg-blue rounded-md p-2  mt-3 ${
        isQuestionActive
          ? "border-l-8 border-blue-700 border-y-2 border-y-blue-700 border-r-2 border-r-blue-700 transition-all duration-400 ease-in-out"
          : "border-2 border-blue-700 transition-all duration-300 ease-in-out"
      } `}
      key={questionObj.id}
      onClick={() => dispatch(activateQuestion(questionIdx))}
    >
      <div className="p-2 flex flex-row justify-between">
        {isQuestionActive ? (
          <input
            className="h-9 w-3/4 text-base focus:outline-none focus:border-b-2 border-blue-700 "
            placeholder="Please Enter Question"
            value={question}
            onChange={(e) => {
              dispatch(
                updateQuestion({ questionIdx, question: e.target.value })
              );
            }}
          />
        ) : (
          <p className="text-base border-blue">
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
            <p className="text-base  underline-offset-2 text-slate-400 decoration-blue-900">
              Short answer text
            </p>
          )}

          {type === "long-ans" && (
            <p className="text-base  underline-offset-2 text-slate-400 decoration-blue-900">
              Long answer text
            </p>
          )}

          {hasOptions && (
            <>
              <Options type={type} options={options} questionIdx={questionIdx} />
              {isQuestionActive && (
                <div className="flex items-center mt-2">
                  {type === "check-boxes" ? (
                    <p>Enter comma seperated values for each option</p>
                  ):(
                    <p>Enter one value per line.</p>
                  )}
                  <input
                    type="text"
                    className="border border-gray-400 p-1 mr-2"
                    placeholder="Enter correct answer"
                    value={correctAnswer || ''}
                    onChange={handleCorrectAnswerChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        {isQuestionActive && (
          <div className="flex gap-2">
            <div className="flex items-center p-6 gap-4 ">
              <span className="text-base text-slate-400">Required</span>
              <Switch questionIdx={questionIdx} startState={required} type="toggleRequired" />
            </div>

            <div className="flex items-center">
              <button
                className="p-3.5 rounded-full hover:bg-slate-100 transition-all duration-300 ease-in-out"
                onClick={() => dispatch(deleteQuestionObj(questionIdx))}
              >
                <AiFillDelete fontSize="1.5rem" color="rgb(100 116 139)" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Question.propTypes = {
  questionObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    required: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string, // Optional for multiple-choice questions
  }),
  questionIdx: PropTypes.number.isRequired,
};

export default Question;
