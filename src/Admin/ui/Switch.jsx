import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAcceptingStatus, toggleRequired } from "../../store/slices/newForm";

function Switch({ questionIdx, startState, type, formId, setStatus }) {
  const [isOn, setIsOn] = useState(startState);
  const dispatch = useDispatch();

  async function toggleFormStatus() {
    setStatus(!isOn);
    setIsOn(!isOn);
    await toggleAcceptingStatus(formId);
  }

  // useEffect(() => {
  //   if (type === "toggleRequired") {
  //     dispatch(toggleRequired(questionIdx));
  //   }
  // }, [isOn, dispatch, questionIdx, type]);

  if (type === "toggleRequired") {
    return (
      <div
        // onClick={() => setIsOn(!isOn)}
        onClick={() => {
          setIsOn(!isOn);
          dispatch(toggleRequired(questionIdx));
        }}
        className={`flex w-8 h-4  rounded-full  ${
          isOn ? "bg-blue-700" : "bg-slate-600"
        } transition-all duration-300 ease-in-out`}
      >
        <span
          className={`h-4 w-4 bg-white border-2 border-blue-700 rounded-full shadow-2xl cursor-pointer ${
            isOn && "ml-4"
          } hover:ring-8 ring-blue-600 transition-all duration-300 ease-in-out`}
        ></span>
      </div>
    );
  }

  if (type === "toggleFormStatus") {
    return (
      <div
        onClick={() => toggleFormStatus()}
        className={`flex w-8 h-4  rounded-full  ${
          isOn ? "bg-blue-700" : "bg-slate-600"
        } transition-all duration-300 ease-in-out`}
      >
        <span
          className={`h-4 w-4 bg-white rounded-full shadow-2xl cursor-pointer ${
            isOn && "ml-4"
          } hover:ring-8 ring-blue-600  transition-all duration-300 ease-in-out`}
        ></span>
      </div>
    );
  }
}

export default Switch;
