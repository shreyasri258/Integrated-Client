import PropTypes from "prop-types";
import AnsOptions from "./AnsOptions"
import { useDispatch, useSelector } from "react-redux";
import { getAns, getTriedSubmitting, setAns } from "../../store/slices/ansForm";
import TextArea from "../ui/TextArea";

function QuestionAns({ questionIdx, questionObj }) {
  const { question, type, options, required } = questionObj;
  const ans = useSelector(getAns(questionIdx));
  const triedSubmitting = useSelector(getTriedSubmitting);

  const dispatch = useDispatch();
  const hasOptions =
    type === "multiple-choice" || type === "check-boxes" || type === "dropdown";

  const hasMessage = triedSubmitting && required && ans === undefined;

  function handleChangedInput(e) {
    if (e.target.value === "") {
      dispatch(setAns({ ansIdx: questionIdx, ans: undefined }));
    } else {
      dispatch(setAns({ ansIdx: questionIdx, ans: e.target.value }));
    }
  }

  return (
    <div
      className={`flex flex-col border-2 ${
        hasMessage && "border-rose-500"
      } mt-9 p-3 shadow-md rounded-md bg-white`}
    >
      <p className="text-base border-0 m-2">
        {question || (
          <span className="italic text-slate-500">Empty Question</span>
        )}{" "}
        {required && <span className="text-rose-500 px-1">*</span>}
      </p>
      {hasOptions && (
        <AnsOptions type={type} options={options} ansIdx={questionIdx} />
      )}

      {type === "short-ans" && (
        <input
          className={`h-9 border-b-2 w-1/3 m-2 text-base focus:outline-none focus:border-indigo-500 ${
            hasMessage && "border-rose-500"
          } `}
          placeholder="Your Answer"
          value={ans}
          onChange={(e) => handleChangedInput(e)}
        />
      )}

      {type === "long-ans" && (
        <TextArea
          classes={
            "focus:border-indigo-500 w-3/4 border-b-2 h-9 m-2 bg-white text-base"
          }
          placeholder="Your Answer"
          value={ans}
          onChange={(e) => handleChangedInput(e)}
        />
      )}

      {hasMessage && (
        <div className="flex m-2 items-center text-rose-500 ">
          <span className="text-base">
            <BsExclamationCircle />
          </span>
          <span className="ml-3 text-base">This is a required question</span>
        </div>
      )}
    </div>
  );
}


QuestionAns.propTypes = {
  questionObj: PropTypes.shape({
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    required: PropTypes.bool.isRequired,
  }),
  answer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),
  setAnswer: PropTypes.func, // Add setAnswer to propTypes
};
export default QuestionAns;

