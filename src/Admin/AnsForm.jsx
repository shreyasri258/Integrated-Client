import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionAns from "./component/QuestionAns";
import {
  getAnswers,
  getQuestionForm,
  getTriedSubmitting,
  readyAns,
  setTriedSubmitting,
  getSubmit,
  setSubmit,
  submitForm,
  // updateAnswer,
} from "../store/slices/ansForm"; // Assuming there's an updateAnswer action in your slice
import { useDispatch, useSelector } from "react-redux";
import Button from "./ui/Button";
import { BsExclamationCircle } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";

function disableHighlightAndPaste() {
  // Disable text selection
  document.body.style.userSelect = 'none';

  // Disable pasting content
  document.addEventListener('paste', (event) => {
    event.preventDefault();
  });

  // Disable context menu (right-click menu)
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}

function enableHighlightAndPaste() {
  // Enable text selection
  document.body.style.userSelect = '';

  // Remove paste event listener
  document.removeEventListener('paste', (event) => {
    event.preventDefault();
  });

  // Remove context menu event listener
  document.removeEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}



function AnsForm({ embeddedFormLink, examTitle }) {
  const { formId } = useParams();
  const [{title, description, questions }, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const answers = useSelector(getAnswers);
  const triedSubmitting = useSelector(getTriedSubmitting);
  const isSubmitted = useSelector(getSubmit);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function FormSetter() {
        setIsLoading(true);
        const res = await getQuestionForm(formId);
        console.log('question form - ',res);
        if (res.status === 200) {
            const form = res.data;
            setForm(form);
            dispatch(readyAns(form.questions.length));
          } else if (res.status === 302) {
            setHasError(true);
            setErrorMsg(res.data.message);
          }
        setIsLoading(false);
      }

      FormSetter();
    },
    [formId, dispatch]
  );
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        event.preventDefault(); // Disable copying (Ctrl+C)
      }
  
      if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault(); // Disable opening the dialog box
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    disableHighlightAndPaste();

    return () => {
      enableHighlightAndPaste();
    };
  }, []);


  async function handleSubmit() {
    let canSubmit = true;
    for (let i = 0; i < answers.length; i++) {
      if (questions[i].required === true && answers[i] === undefined) {
        dispatch(setTriedSubmitting(true));
        setErrorMsg("Answer all the required questions before submitting");
        canSubmit = false;
      }
    }
  
    if (canSubmit) {
      console.log("submitting form");
      const res = await submitForm(answers, formId);
      console.log(res);
      dispatch(setSubmit(true))
      if (res.status === 201) {
        dispatch(setTriedSubmitting(false));
        console.log("submitted");
        if (isSubmitted) {
          // Close the parent window
          window.parent.close();
        }
      }
      if (res.status === 302) {
        dispatch(setTriedSubmitting(true));
        setErrorMsg(res.data.message);
      }
    }
  }
  
  if (isLoading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
    

  return (
    <div>
      <div className="flex w-screen justify-center mb-16">
        <div className="w-4/6">
          <div className="flex justify-center pt-3">
            <span className="ml-12 text-indigo-500  text-3xl transition-colors duration-300 ease-in-out  ">
              <Link to="/app">
                <span className="font-pacifico indigo_gradient">Formaker</span>
              </Link>
            </span>
          </div>

          {hasError ? (
            <div className="flex justify-center items-center mt-16">
              <p className="text-lg text-indigo-500">{errorMsg} !!</p>
            </div>
          ) : (
            <div className="mt-4">
              <p
                className="h-10  text-lg  font-semibold"
                style={{ border: "2px solid transparent" }}
              >
                {title}
              </p>
              {description && (
                <p
                  className="h-8 text-base mb-3"
                  style={{ border: "2px solid transparent" }}
                >
                  {description}
                </p>
              )}

              {questions.map((q, idx) => {
                return (
                  <QuestionAns questionIdx={idx} questionObj={q} key={idx} />
                );
              })}
              <div className="flex items-center mt-6">
                <Button
                  classes={"self-start hover:ring-8 ring-indigo-200"}
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
                {triedSubmitting && (
                  <div className="flex items-center text-rose-500 ml-6 ">
                    <span className="text-lg">
                      <BsExclamationCircle />
                    </span>
                    <span className="ml-3 text-lg">{errorMsg}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnsForm;
