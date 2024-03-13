import PropTypes from "prop-types";
import RadioButton from "../ui/RadioButton";
import CheckBox from "../ui/CheckBox";



function QuestionAns({ questionObj, answer, setAnswer }) { // Receive setAnswer prop
  const { question, type, options, required } = questionObj;
  console.log('in  QuestionAns', questionObj);
  console.log('in QuestionAns - answer - ',answer);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value); // Use setAnswer to update the answer
  };


  return (
    <div className={`flex flex-col mt-3 p-2 shadow rounded-md bg-white`}>
      <p className="text-base border-0 m-3">
        {question} {required && <span className="text-rose-500 px-1">*</span>}
      </p>

      {type === "short-ans" && (
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          className="w-1/2 mx-3 border-b-2 text-base"
        />
      )}

      {type === "long-ans" && (
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          className="w-3/4 m-3 border-b-2 text-base"
        />
      )}

      <div className="m-3">
        {type === "multiple-choice" && (
          <div className="flex flex-col gap-3">
            {options.map((option, idx) => {
              // console.log('options - map - ',option);
              return (
                <RadioButton
                  answer={answer}
                  option={option}
                  idx={idx}
                  key={idx}
                  disabled={false}
                  type={"show-ans"}
                />
              );
            })}
          </div>
        )}
        {type === "check-boxes" && (
          <div className="flex flex-col gap-3">
            {options.map((option, idx) => {
              return (
                <CheckBox
                  option={option}
                  idx={idx}
                  key={idx}
                  disabled={true}
                  answers={answer}
                  type={"show-ans"}
                />
              );
            })}
          </div>
        )}
        {type === "dropdown" && (
          <div className="flex">
            <button className="bg-blue-500 text-white p-2 w-52 rounded-md ">
              <span>Select Answer</span>
              <span className="text-lg "> &#8595;</span>
            </button>
            <span className="self-center ml-6 text-lg border-b-2 border-blue-600">
              {options[answer]}
            </span>
          </div>
        )}
        {/* {type === "dropdown" && (
          <div className="flex">
            <button className="bg-blue-700 text-white p-2 w-52 rounded-md ">
              <span>Select Answer</span>
              <span className="text-lg "> &#8595;</span>
            </button>
            <span className="self-center ml-6 text-lg border-b-2 border-blue-700">
              {options.find((option) => option === answer)}
            </span>
          </div>
        )} */}

      </div>
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
  setAnswer: PropTypes.func.isRequired, // Add setAnswer to propTypes
};


export default QuestionAns;

// import PropTypes from "prop-types";
// import RadioButton from "../ui/RadioButton";

// function QuestionAns({ questionObj, answer }) {
//   const { question, options, required } = questionObj;

//   return (
//     <div className={`flex flex-col mt-3 p-2 shadow rounded-md bg-white`}>
//       <p className="text-base border-0 m-3">
//         {question} {required && <span className="text-rose-500 px-1">*</span>}
//       </p>

//       {options.length > 0 && (
//         <div className="m-3">
//           <div className="flex flex-col gap-3">
//             {options.map((option, idx) => (
              
//               <RadioButton
//                 answer={answer}
//                 option={option}
//                 idx={idx}
//                 key={idx}
//                 disabled={true}
//                 type={"show-ans"}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {!options.length && (
//         <div className="m-3">
//           <button className="bg-blue-500 text-white p-2 w-52 rounded-md ">
//             <span>Select Answer</span>
//             <span className="text-lg "> &#8595;</span>
//           </button>
//           <span className="self-center ml-6 text-lg border-b-2 border-blue-600">
//             {answer}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// QuestionAns.propTypes = {
//   questionObj: PropTypes.shape({
//     question: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(PropTypes.string).isRequired,
//     required: PropTypes.bool.isRequired,
//   }),
//   answer: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(PropTypes.string),
//     PropTypes.number,
//   ]),
// };

// export default QuestionAns;
