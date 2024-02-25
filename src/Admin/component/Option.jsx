import PropTypes from "prop-types";
import React from "react";
import {
  activateOption,
  deleteOption,
  getActiveInfo,
  getActiveOptionIdx,
  updateOptionValue,
} from "../../store/slices/newForm";
import { useDispatch, useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import CheckBox from "../ui/CheckBox";
import RadioButton from "../ui/RadioButton";

function Option({ children, type, questionIdx, optionIdx }) {
  const value = children;
  const dispatch = useDispatch();
  const active = useSelector(getActiveInfo);
  const activeOptionIdx = useSelector(getActiveOptionIdx(questionIdx));

  const isOptionActive = activeOptionIdx === optionIdx;
  const isQuestionActive = active.questionIdx === questionIdx;

  return (
    <div className="flex justify-between ">
      <li
        className="flex-1"
        onClick={() => {
          dispatch(activateOption({ questionIdx, optionIdx }));
        }}
      >
        {isQuestionActive && isOptionActive ? (
          <div className="flex items-center">
            {type === "check-boxes" && <CheckBox disabled={true} />}
            {type === "multiple-choice" && <RadioButton disabled={true} />}
            {type === "dropdown" && <p>{optionIdx + 1}.</p>}

            <input
              className={`text-base m-3 w-full focus:outline-none border-b-2 border-b-indigo-500`}
              defaultValue={value}
              onChange={(e) => {
                dispatch(
                  updateOptionValue({
                    questionIdx,
                    optionIdx,
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {type === "check-boxes" && <CheckBox disabled={true} />}
            {type === "multiple-choice" && <RadioButton disabled={true} />}
            {type === "dropdown" && <p>{optionIdx + 1}.</p>}
            <p className="text-base m-3 w-full">
              {value || (
                <span className="text-slate-400">Please Enter Option</span>
              )}
            </p>
          </div>
        )}
      </li>

      {isQuestionActive && isOptionActive && (
        <div className="flex items-center justify-center w-16">
          <button
            className=" hover:bg-slate-100 p-2 rounded-full transition-all duration-300 ease-in-out"
            onClick={() => dispatch(deleteOption({ questionIdx, optionIdx }))}
          >
            <TiDeleteOutline color="rgb(99 102 241)" fontSize={"1.5rem"} />
          </button>
        </div>
      )}
    </div>
  );
}

Option.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  questionIdx: PropTypes.number.isRequired,
  optionIdx: PropTypes.number.isRequired,
};

export default Option;
