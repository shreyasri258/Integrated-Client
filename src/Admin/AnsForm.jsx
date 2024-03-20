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
import Swal from 'sweetalert2'; // Import SweetAlert

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

  useEffect(() => {
    async function FormSetter() {
      setIsLoading(true);
      const res = await getQuestionForm(formId);
      console.log('question form - ', res);
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
  }, [formId, dispatch]);

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

  let isSubmitting = false; // Flag to track if form is already being submitted

  //let isSubmitting = false; // Flag to track if form is already being submitted

  async function handleSubmit() {
    let canSubmit = true;
    for (let i = 0; i < answers.length; i++) {
      if (questions[i].required === true && answers[i] === undefined) {
        dispatch(setTriedSubmitting(true));
        setErrorMsg("Answer all the required questions before submitting");
        canSubmit = false;
      }
    }
  
    if (canSubmit && !isSubmitting) {
      // Disable Ctrl+Shift+I
      const disableDevTools = (e) => {
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', disableDevTools);
  
      // Display SweetAlert confirmation dialog
      Swal.fire({
        title: 'Do you really want to submit?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          isSubmitting = true; // Set flag to true to prevent multiple submissions
          submitFormAndHandleResponse();
        }
        window.removeEventListener('keydown', disableDevTools); // Remove the event listener after dialog is closed
      });
  
      // Prevent opening developer tools in a new window
      window.addEventListener('beforeunload', preventDevToolsOpen);
    }
  }
  
  function preventDevToolsOpen(event) {
    // Close the window if developer tools are detected
    if (event.clientY < 0 || event.clientX < 0 || (event.metaKey && event.key === 'r')) {
      window.close();
    }
  }
  


async function submitFormAndHandleResponse() {
  console.log("submitting form");
  const res = await submitForm(answers, formId);
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

  // Close the SweetAlert dialog
  Swal.close();
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

          {hasError ? (
            <div className="flex justify-center items-center mt-16">
              <p className="text-lg text-bue-500">{errorMsg} !!</p>
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
                  classes={"self-start hover:ring-8 ring-blue-200"}
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
