import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import TextArea from "./ui/TextArea";
import { useAuth } from "../store/UserAuth";
import { getForm, sendFormLink } from "../store/slices/viewSubmissions";
import { isValidEmail } from "./utils";

function SendByEmail() {
  const form = useSelector(getForm);
  const { user, authUser } = useAuth();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [hasValidEmail, setHasValidEmail] = useState(true);
  const [emailsList, setEmailsList] = useState([]);
  const [sending, setSending] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleAddEmail() {
    if (isValidEmail(email)) {
      setHasValidEmail(true);
      setEmailsList((emailsList) => [...emailsList, email]);
      setEmail("");
    } else {
      setHasValidEmail(false);
    }
  }

  function handleDeleteEmail(emailIdx) {
    setEmailsList((emailsList) =>
      emailsList.filter((email, idx) => idx !== emailIdx)
    );
  }

  function handleGenerateContent() {
    setSubject("ProctorPal Form Link");

    console.log(form);
    setBody(
      `${user.name.toUpperCase()} has sent this mail so you can answer the form titled: '${
        form.title
      }' using the link given.`
    );
  }

  async function handleSendLink() {
    const CLIENT_URL = import.meta.env.VITE_REACT_APP_CLIENT_URL || `http://localhost:5173`;
    console.log(CLIENT_URL);
    const link = `${CLIENT_URL}/ansForm/${form._id}`;
    setHasSubmitted(true);
    if (emailsList.length > 0) {
      setSending(true);
      const res = await sendFormLink(link, emailsList, subject, body);
      if (res.status === 200) {
        setSending(false);
        setSubject("");
        setBody("");
        setEmail("");
        setEmailsList([]);
      } else if (res.status === 401) {
        await authUser();
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full  h-full">
      <div className="flex gap-6 w-1/2 flex-col ">
        <h1 className="text-lg text-indigo-500 font-bold tracking-wide">
          Send Form Link Via Email
        </h1>
        <input
          className="p-2 border-2 rounded-xl text-base text-indigo-700 bg-indigo-200 placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Email Subject"
        />

        <TextArea
          classes={
            "p-2 border-2 rounded-xl text-base text-indigo-700 bg-indigo-200 placeholder:text-indigo-400 focus:outline-none focus:border-indigo-400"
          }
          placeholder={"Enter Email Body"}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="2"
        />

        <div className="flex justify-end">
          <button
            onClick={handleGenerateContent}
            className="p-2 bg-indigo-400 text-slate-100 text-base rounded-lg  hover:bg-indigo-500 active:bg-indigo-200 active:text-slate-900"
          >
            Generate Email Content
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col w-1/2">
            <input
              className={`p-2 border-2  rounded-xl text-base text-indigo-700 bg-indigo-200 placeholder:text-indigo-400 focus:outline-none ${
                hasValidEmail === false
                  ? " border-rose-500"
                  : "focus:border-indigo-400"
              }`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email ID"
            />
            {hasValidEmail === false && (
              <span className="text-base text-rose-500 px-3 py-2 ">
                Enter valid Email ID
              </span>
            )}
          </div>
          <button
            onClick={handleAddEmail}
            className="p-2 bg-indigo-400 text-slate-100 text-base rounded-lg  hover:bg-indigo-500 active:bg-indigo-200 active:text-slate-900"
          >
            Add Email
          </button>
        </div>
        {emailsList.length === 0 ? (
          <span className="ml-3 text-base text-indigo-500 italic">
            Enter Email IDs
          </span>
        ) : (
          <div className="flex flex-wrap">
            {emailsList.map((email, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center p-1 m-1 rounded-full text-indigo-700 border"
                  style={{
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                  }}
                >
                  <span className="px-1 text-sm">{email}</span>
                  <span
                    onClick={() => handleDeleteEmail(idx)}
                    className="cursor-pointer hover:bg-indigo-400 hover:text-slate-100 p-1 rounded-full"
                  >
                    <AiOutlineClose />
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => handleSendLink()}
            disabled={emailsList.length === 0}
            className="bg-indigo-400  p-2 font-semibold text-base whitespace-nowrap rounded-full text-slate-100 hover:bg-indigo-500 active:bg-indigo-200 active:text-slate-900 disabled:bg-indigo-200 disabled:text-indigo-400"
          >
            Send Form Link
          </button>
        </div>

        {sending && (
          <div className="flex justify-center">
            <span className="text-xl text-indigo-500 font-bold tracking-widest">
              SENDING . . .
            </span>
          </div>
        )}

        {hasSubmitted && !sending && (
          <div className="flex justify-center">
            <span className="text-xl text-indigo-500">
              Form Links Sent Succesfully !!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SendByEmail;
