import Option from "../../Admin/component/Option";
import { useDispatch, useSelector } from "react-redux";
import { addOption, getActiveInfo } from "../../store/slices/newForm";
import CheckBox from "../ui/CheckBox";
import RadioButton from "../ui/RadioButton";

function Options({ type, options, questionIdx }) {
  const dispatch = useDispatch();

  const active = useSelector(getActiveInfo);

  const isQuestionActive = active.questionIdx === questionIdx;

  return (
    <div className="flex flex-col">
      <ul>
        {options.map((option, idx) => {
          return (
            <Option
              type={type}
              key={idx}
              questionIdx={questionIdx}
              optionIdx={idx}
            >
              {option}
            </Option>
          );
        })}

        <div className="flex py-3">
          {isQuestionActive && type === "check-boxes" && (
            <CheckBox disabled={true} />
          )}
          {isQuestionActive && type === "multiple-choice" && (
            <RadioButton disabled={true} />
          )}
          {isQuestionActive && type === "dropdown" && (
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
      </ul>
    </div>
  );
}

export default Options;
