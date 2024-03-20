import PropTypes from "prop-types";
import Option from "../component/Option";
import { useDispatch, useSelector } from "react-redux";
import { addOption, getActiveInfo } from "../../store/slices/newForm";
import CheckBox from "../ui/CheckBox";
import RadioButton from "../ui/RadioButton";
import { useState } from "react";

// Define the valid option types
const OptionType = {
  CHECKBOXES: "check-boxes",
  MULTIPLE_CHOICE: "multiple-choice",
  DROPDOWN: "dropdown",
};

function Options({ type, options, questionIdx }) {
  const dispatch = useDispatch();
  const active = useSelector(getActiveInfo);
  const isQuestionActive = active.questionIdx === questionIdx;
  const [value,setValue]=useState('')

  function handleInput(event) {
    setValue(event.target.value);
  }

  const renderOption = (option, idx) => (
    <Option
      type={type}
      key={option.id}
      questionIdx={questionIdx}
      optionIdx={idx}
    >
      {option}
    </Option>
  );

  return (
    <div className="flex flex-col">
      <ul>
        {options.map(renderOption)}

        <div className="flex py-3">
          {isQuestionActive && type === OptionType.CHECKBOXES && (
            <CheckBox disabled={true} />
          )}
          {isQuestionActive && type === OptionType.MULTIPLE_CHOICE && (
            <RadioButton disabled={true} />
          )}
          {isQuestionActive && type === OptionType.DROPDOWN && (
            <p className="inline">{options.length + 1}.</p>
          )}
          {isQuestionActive && (
            <button
              onClick={() => {
                dispatch(
                  addOption({
                    questionIdx,
                    option: "",
                  })
                );
              }}
            >
              <span className="m-3 text-slate-400 text-base italic hover:underline">
                Add option
              </span>
            </button>

          )}
        </div>
        {/* <label>
          Set Correct Answer:
          <input type="text" value={value} onChange={handleInput}  style={{ width: '500px', margin:"20px"}} />
        </label> */}
        
      </ul>
    </div>
  );
}

Options.propTypes = {
  type: PropTypes.oneOf(Object.values(OptionType)).isRequired,
  options: PropTypes.array.isRequired,
  questionIdx: PropTypes.number.isRequired,
};

export default Options;
