import Question from "./component/Question";
import Swal from 'sweetalert2';
import Icon from "../images/Icon.png";
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
  updateDuration
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
  const { title, description, active, duration } = form;
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

  async function handleCreatingForm(form) {
    if (title !== "" && duration !=="") {
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
      setMsg("Title and Duration are necessary to create the Exam");
    }
  }

  return (
    
    <div className="flex items-center justify-center w-screen mb-8 mt-4">
       <div className="fixed top-10 left-10 mt-2 ml-2">
           
            <img src={Icon} alt="Icon" />
          </div>

          <div className="fixed bottom-10 right-10 z-50">
    <button
      className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
      onClick={() => navigate("/admin-dashboard")}
    >
      Back to Dashboard
    </button>
  </div>

      <div className="w-full max-w-3xl px-4">
        <div className="text-2xl text-blue-700 font-semibold mb-4 text-center">
          Create Exam
        </div>

        <div className="border-2 border-black-200 rounded-md my-3 relative">
          {/* Space reserved for your icon */}
         

          <div
            onClick={() => {
              dispatch(activateTitle());
            }}
            className="p-4 border-b border-black-200 cursor-pointer hover:bg-black-50"
          >
            {active.title ? (
              <input
                className="w-full py-2 bg-black-100 border-b-2 border-black-600 text-lg focus:outline-none placeholder-black-600"
                value={title}
                placeholder="Enter Form Title"
                onChange={(e) => {
                  dispatch(updateTitle(e.target.value));
                  setMsg(null);
                }}
              />
            ) : (
              <p className="text-lg text-black-600">
                {title || "Enter Form Title"}
              </p>
            )}
          </div>

          <div className="p-4 border-b border-black-200">
            <input
              className="w-full py-2 bg-black-100 border-b-2 border-black-600 text-lg focus:outline-none placeholder-black-600"
              value={duration}
              placeholder="Enter Form Duration (in minutes)"
              onChange={(e) => dispatch(updateDuration(e.target.value))}
            />
          </div>

          <div
            onClick={() => {
              dispatch(activateDescription());
            }}
            className="p-4 border-b border-black-200 cursor-pointer hover:bg-black-50"
          >
            {active.description ? (
              <input
                className="w-full py-2 bg-black-100 border-b-2 border-black-600 text-base focus:outline-none placeholder-black-600"
                value={description}
                placeholder="Enter Form Description"
                onChange={(e) => dispatch(updateDescription(e.target.value))}
              />
            ) : (
              <p className="text-base text-black-600">
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
            className="p-2 rounded-full hover:bg-black-500 hover:ring-2 hover:ring-black-300 transition-all duration-300 ease-in-out"
            onClick={() => {
              dispatch(
                addQuestionObj({
                  newQuestion: initialQuestion,
                })
              );
            }}
          >
            <BsPlusCircleDotted className="text-2xl text-black-500" />
          </button>
          <div className="self-start mt-4">
            <Button
              className=" bg-blue-700 hover:bg-blue-700 text-white px-4 py-2 rounded-full hover:ring-2 hover:ring-blue-700 transition-all duration-300 ease-in-out "
              onClick={() => {
                if (!title || !duration) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error Creating Exam',
                    text: 'Please fill in the Exam title and duration !',
                  });
                } else {
                  handleCreatingForm(form);
                }
              }}
              type="submit"
            >
              Create Exam
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewForm;
