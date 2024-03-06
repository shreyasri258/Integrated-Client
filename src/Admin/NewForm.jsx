import Question from "./component/Question";
import { useDispatch, useSelector } from "react-redux";
import {
  activateDescription,
  activateTitle,
  addQuestionObj,
  getForm,
  getQuestions,
  getRefinedForm,
  postRefinedForm,
  resetForm,
  updateDescription,
  updateTitle,
} from "../store/slices/newForm";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleDotted, BsExclamationCircle } from "react-icons/bs";
import Button from "./ui/Button";
import { useState } from "react";
import { useAuth } from "../store/UserAuth";

const initialQuestion = {
  question: "",
  type: "",
  options: [],
  required: false,
  correctAnswer:null,
};

function NewForm() {
  const dispatch = useDispatch();
  const { authUser } = useAuth();
  const questions = useSelector(getQuestions);
  const form = useSelector(getForm);
  const { title, description, active } = form;
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

  async function handleCreatingForm(form) {
    if (title !== "") {
      const refinedForm = getRefinedForm(form);
      const res = await postRefinedForm(refinedForm);
      if (res.status === 200) {
        dispatch(resetForm());
        navigate("/admin-dashboard");
      }
      if (res.status === 401) {
        await authUser();
      }
    } else {
      setMsg("Title is necessary to create the form");
    }
  }

  return (
    <div className="flex items-center justify-center w-screen mb-8 mt-4">
      <div className="w-full max-w-3xl px-4">
        <div className="text-lg text-indigo-500 font-semibold mb-4">
          Make Form
        </div>
        <div className="border-2 border-gray-200 rounded-md my-3">
          {/* Updated border color here */}
          <div
            onClick={() => {
              dispatch(activateTitle());
            }}
            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            {/* Updated placeholder text color here */}
            {active.title ? (
              <input
                className="w-full py-2 bg-gray-100 border-b-2 border-gray-600 text-lg focus:outline-none placeholder-gray-600"
                value={title}
                placeholder="Enter Form Title"
                onChange={(e) => dispatch(updateTitle(e.target.value))}
              />
            ) : (
              <p className="text-lg text-gray-600">
                {title || "Enter Form Title"}
              </p>
            )}
          </div>

          
          <div
            onClick={() => {
              dispatch(activateDescription());
            }}
            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            {active.description ? (
              <input
                className="w-full py-2 bg-gray-100 border-b-2 border-gray-600 text-base focus:outline-none placeholder-gray-600"
                value={description}
                placeholder="Enter Form Description"
                onChange={(e) => dispatch(updateDescription(e.target.value))}
              />
            ) : (
              <p className="text-base text-gray-600">
                {description || "Enter Form Description"}
              </p>
            )}
          </div>
        </div>

        {questions.map((q, idx) => {
          return <Question questionObj={q} questionIdx={idx} key={idx} />;
        })}

        <div className="flex flex-col items-end mt-4">
          <button
            className="p-2 rounded-full hover:bg-gray-500 hover:ring-2 hover:ring-gray-300 transition-all duration-300 ease-in-out"
            onClick={() => {
              dispatch(
                addQuestionObj({
                  newQuestion: initialQuestion,
                })
              );
            }}
          >
            <BsPlusCircleDotted className="text-2xl text-gray-500" />
          </button>
          <div className="self-start flex mt-4">
            <Button
            style={{ backgroundColor: 'blue', /* Add other styles as needed */ }}
              classes="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full hover:ring-2 hover:ring-blue-300 transition-all duration-300 ease-in-out"
              onClick={() => handleCreatingForm(form)}
              type="submit"
            >
              Create Form
            </Button>
            {msg && (
              <span className="text-xl text-red-500 pl-3 flex items-center">
                <BsExclamationCircle className="text-2xl" />
                <p className="ml-2">{msg}</p>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewForm;
