import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
} from "../store/slices/ansForm";
import {
  setTimeExpired,
  getTimeExpired,
  incrementMalPracticeAttempts,
  getMalPracticeAttempts,
} from "../store/slices/examTimer";
import { useDispatch, useSelector } from "react-redux";
import Button from "./ui/Button";
import { BsExclamationCircle } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";
import Swal from "sweetalert2"; // Import SweetAlert
import store from "../store/store";

function disableHighlightAndPaste() {
  // Disable text selection
  document.body.style.userSelect = "none";

  // Disable pasting content
  document.addEventListener("paste", (event) => {
    event.preventDefault();
  });

  // Disable context menu (right-click menu)
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function enableHighlightAndPaste() {
  // Enable text selection
  document.body.style.userSelect = "";

  // Remove paste event listener
  document.removeEventListener("paste", (event) => {
    event.preventDefault();
  });

  // Remove context menu event listener
  document.removeEventListener("contextmenu", (event) => {
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
  const malpracticeAttempts = useSelector(getMalPracticeAttempts);
  const [warningCnt, setWarningCnt] = useState(0);
  const [timeDuration, setTimeDuration] = useState(null);

  useEffect(() => {
    disableHighlightAndPaste();
    return () => {
      enableHighlightAndPaste();
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin === window.location.origin && event.data.malpracticeAttempts !== undefined) {
        dispatch(incrementMalPracticeAttempts());
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  useEffect(() => {
    if (timeDuration !== null && !isNaN(timeDuration)) {
      // Check if timeDuration is not null and a valid number
      const interval = setInterval(() => {
        console.log(`timeDuration - ${timeDuration}`);
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
      console.log("question form in ansForm comp - ", res);
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
      if (event.ctrlKey && event.key === "c") {
        event.preventDefault(); // Disable copying (Ctrl+C)
      }
      // if (event.ctrlKey && event.shiftKey && event.key === "I") {
      //   event.preventDefault(); // Disable opening the dialog box
      // }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
//   useEffect(() => {
//     const visibilityChangeHandler = () => {
//         const sound = new Audio(Warning);
//         if (document.hidden) {
//             setWarningCnt((warningCnt) => warningCnt + 1);
//             sound.play();
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Warning',
//                 text: `You switched tabs in AnsForm. Please return to the exam.Warning count: ${warningCnt}`,
//                 showCancelButton: true,
//                 confirmButtonText: 'Return to Fullscreen',
//                 cancelButtonText: 'Cancel',
//                 customClass: {
//                     popup: 'my-popup-class',
//                 },
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     dispatch(incrementMalPracticeAttempts());
//                   
//                     handleFullscreen();
//                 }
//             });
//         }
//         // terminateExam(); // Ensure that terminateExam is called
//     };

//     document.addEventListener('visibilitychange', visibilityChangeHandler);

//     return () => {
//         document.removeEventListener('visibilitychange', visibilityChangeHandler);
//     };
// }, [warningCnt]);


  useEffect(() => {
    if (isTimeExpired && !isSubmitted) {
      console.log(`useEffect ins ansForm - ${isTimeExpired} , ${isSubmitted}`);
      handleAutoSubmit();
    }
  }, [isTimeExpired, isSubmitted]);

  let isSubmitting = false; // Flag to track if form is already being submitted

  async function handleSubmit() {
    // console.log("handleSubmit called - ",malpracticeAttempts, " ", isTimeExpired);
    let canSubmit = true;
    for (let i = 0; i < answers.length; i++) {
      if (questions[i].required === true && answers[i] === undefined) {
        dispatch(setTriedSubmitting(true));
        setErrorMsg("Answer all the required questions before submitting");
        canSubmit = false;
      }
    }
    if (canSubmit && !isSubmitting) {
      //temp
      const disableDevTools = (e) => {
        if (
          (e.ctrlKey && e.shiftKey && e.key === "I") ||
          (e.ctrlKey && e.key === "U")
        ) {
          e.preventDefault();
        }
      };
      window.addEventListener("keydown", disableDevTools);
      console.log("submitting form");
      if(isTimeExpired){
        Swal.fire({
            title: "Time Expired, Your Response is submitted",
            icon: "Success",
            showCancelButton: true,
            // confirmButtonText: 'Yes',
            // cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              isSubmitting = true; // Set flag to true to prevent multiple submissions
              submitFormAndHandleResponse(malpracticeAttempts);
            }
            window.removeEventListener("keydown", disableDevTools); // Remove the event listener after dialog is closed
          });
      } else{
        Swal.fire({
          title: "Do you really want to submit?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            isSubmitting = true; // Set flag to true to prevent multiple submissions
            submitFormAndHandleResponse(malpracticeAttempts);
          }
          window.removeEventListener("keydown", disableDevTools); // Remove the event listener after dialog is closed
        });
      }
     
      window.addEventListener("beforeunload", preventDevToolsOpen);
    }
  }

  async function handleAutoSubmit() {
    if (!isSubmitted && isTimeExpired) {
      // dispatch(incrementMalPracticeAttempts());
      await handleSubmit()
      console.log("Form autosubmitted"); 
    }
  }

  function preventDevToolsOpen(event) {
    // Close the window if developer tools are detected
    if (
      event.clientY < 0 ||
      event.clientX < 0 ||
      (event.metaKey && event.key === "r")
    ) {
      window.close();
    }
  }

  async function submitFormAndHandleResponse(malpracticeAttempts) {
    const res = await submitForm(answers, formId,malpracticeAttempts);
    console.log(res);
    dispatch(setSubmit(true));
    if (res.status === 201) {
      dispatch(setTriedSubmitting(false));
      console.log("submitted");
      // Close the parent window
      window.parent.close();
    }
    if (res.status === 302) {
      dispatch(setTriedSubmitting(true));
      setErrorMsg(res.data.message);
    }
    isSubmitting = false; // Reset the flag after form submission is completed
    Swal.close();
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

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
                    textOverflow: "ellipsis",
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
