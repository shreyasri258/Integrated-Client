import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionAns from "./component/QuestionAns";
import {
  getAnswers,
  getQuestionForm,
  getTriedSubmitting,
  readyAns,
  setTriedSubmitting,
  submitForm,
} from "../store/slices/ansForm";
import { useDispatch, useSelector } from "react-redux";
import Button from "./ui/Button";
import { BsExclamationCircle } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";

function AnsForm() {
  const { formId } = useParams();
  const [{ title, description, questions }, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const answers = useSelector(getAnswers);
  const triedSubmitting = useSelector(getTriedSubmitting);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function FormSetter() {
        setIsLoading(true);
        const res = await getQuestionForm(formId);
        console.log(res);
        if (res.status === 200) {
          const form = res.data;
          console.log('form - ',form);
          setForm(form);
          dispatch(readyAns(form.questions.length));
        }

        if (res.status === 302) {
          setHasError(true);
          setErrorMsg(res.data.message);
        }
        setIsLoading(false);
      }

      FormSetter();
    },
    [formId, dispatch]
  );

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
      if (res.status === 201) {
        dispatch(setTriedSubmitting(false));
        console.log("submitted");
        navigate("/ansform/submitted");
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
            <span className="ml-12 text-blue-500  text-3xl transition-colors duration-300 ease-in-out  ">
              <Link to="/admin-dashboard">
                <span className="font-pacifico indigo_gradient">ProctorPal</span>
              </Link>
            </span>
          </div>

          {hasError ? (
            <div className="flex justify-center items-center mt-16">
              <p className="text-lg text-blue-500">{errorMsg} !!</p>
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
                console.log('ques - ',q);
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
