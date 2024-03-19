import { useEffect, useState } from "react";
import { Link, useNavigate, useParams , useLocation } from "react-router-dom";
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
import { setTimeExpired, getTimeExpired } from "../store/slices/examTimer";
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
  const [{ title, description, questions }, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const answers = useSelector(getAnswers);
  const triedSubmitting = useSelector(getTriedSubmitting);
  const isSubmitted = useSelector(getSubmit);
  const navigate = useNavigate();
  const isTimeExpired = useSelector(getTimeExpired);
  console.log(`isTimeExpired in ans - ${isTimeExpired}`)
  const location = useLocation(); // Use useLocation hook to get location object
    const params = new URLSearchParams(location.search);
    const durationParam = params.get("duration");
  const duration = durationParam ? parseInt(durationParam) : null; // Parse duration
 const [timeDuration, setTimeDuration] = useState(null);
  console.log(`duration - ${duration}`);
  // alert(`duration - ${duration} - `, duration)

  useEffect(() => {
    console.log("isTimeExpired updated:", isTimeExpired);
  }, [isTimeExpired]);

  
    useEffect(() => {
      if (timeDuration !== null && !isNaN(timeDuration)) { // Check if timeDuration is not null and a valid number
        const interval = setInterval(() => {
          console.log(`timeDuration - ${timeDuration}`)
          dispatch(setTimeExpired(true));
        }, timeDuration * 60 * 1000);
        return () => clearInterval(interval);
      }
    }, [timeDuration, dispatch]);
  
  
  useEffect(() => {
    async function FormSetter() {
      console.log("FormSetter triggered");
      setIsLoading(true);
      const res = await getQuestionForm(formId);
      console.log('question form in ansForm comp - ', res);
      if (res.status === 200) {
        const form = res.data;
        setTimeDuration(parseInt(form.timeDuration));
        setForm(form);
        dispatch(readyAns(form.questions.length));
      } else if (res.status === 302) {
        setHasError(true);
        setErrorMsg(res.data.message);
      }
      setIsLoading(false);
    }
    FormSetter();
  }, [formId, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        event.preventDefault(); // Disable copying (Ctrl+C)
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

  useEffect(() => {
    if (isTimeExpired && !isSubmitted) {
      console.log(`useEffect ins ansForm - ${isTimeExpired} , ${isSubmitted}`)
      handleAutoSubmit();
    }
  }, [isTimeExpired, isSubmitted]);



  async function handleSubmit() {
    console.log("handleSubmit called");
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
      dispatch(setSubmit(true));
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

  async function handleAutoSubmit() {
    console.log(`handleAutoSubmit called - ${isTimeExpired} , ${isSubmitted}`);
    if (!isSubmitted && isTimeExpired) {
      await handleSubmit();
      console.log("Form autosubmitted");
      window.parent.close();
    }
  }

  


  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  };
    

  return (
    <div>
      <div className="flex w-screen justify-center mb-16">
        <div className="w-4/6">
         
          {hasError ? (
            <div className="flex justify-center items-center mt-16">
              <p className="text-lg text-indigo-500">{errorMsg} !!</p>
            </div>
          ) : (
            <div className="mt-4">
              {/* <p
                className="h-10  text-lg  font-semibold"
                style={{ border: "2px solid transparent" }}
              >
                {title}
              </p> */}
              {description && (
  <p
    className="h-8 text-base mb-3"
    style={{
      width: "500px", // Set a specific width for the description
      border: "2px solid transparent",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }}
    title={description} // Show full description on hover
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
