import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import TextArea from "./ui/TextArea";
import { useAuth } from "../store/UserAuth";
import { getForm, sendFormLink } from "../store/slices/viewSubmissions";
import { isValidEmail } from "./utils";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      toast.error("Enter valid Email ID");
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
    const CLIENT_URL =
      import.meta.env.VITE_REACT_APP_CLIENT_URL || `http://localhost:5173`;
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
        toast.success("Email sent successfully", { position: "top-right" });
      } else if (res.status === 401) {
        await authUser();
      }
    }
  }
  

  return (
    <>
      
      <ToastContainer />
      <div className="flex justify-center items-center w-full  h-full">
        <div className="flex gap-6 flex-col ">
          <h1
            className="p-5 text-lg text-blue-700 font-bold tracking-wide"
            style={{
              marginTop: "70px",
              fontSize: "25px",
              marginBottom: "30px",
            }}
          >
            Send Form Link Via Email
          </h1>
          <input
            className="p-2 border-2 rounded-xl text-base text-blue-700 bg-blue-200 placeholder:text-blue-400 focus:outline-none focus:border-blue-400"
            style={{ width: "500px" }}
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Email Subject"
          />

          <TextArea
            classes={
              "p-2 border-2 rounded-xl text-base text-blue-700 bg-blue-200 placeholder:text-blue-400 focus:outline-none focus:border-blue-400"
            }
            placeholder={"Enter Email Body"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="2"
          />

          <div className="flex justify-end">
            <button
              style={{ marginLeft: "300px" }}
              onClick={handleGenerateContent}
              className="p-2 bg-blue-700 text-slate-100 text-base rounded-lg  hover:bg-blue-500 active:bg-blue-200 active:text-slate-900"
            >
              Generate Email Content
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col w-1/2">
              <input
                className={`p-2 border-2  rounded-xl text-base text-blue-700 bg-blue-200 placeholder:text-blue-400 focus:outline-none ${
                  hasValidEmail === false
                    ? " border-rose-500"
                    : "focus:border-blue-400"
                }`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email ID"
              />
              {/* {hasValidEmail === false && (
                <span className="text-base text-rose-500 px-3 py-2 ">
                  Enter valid Email ID
                </span>
              )} */}
            </div>
            <button
              onClick={handleAddEmail}
              style={{ marginLeft: "150px" }}
              className="p-2 bg-blue-700 text-slate-100 text-base rounded-lg  hover:bg-blue-500 active:bg-blue-200 active:text-slate-900"
            >
              Add Email
            </button>
          </div>
          {emailsList.length === 0 ? (
            <span className="ml-3 text-base text-blue-500 italic">
              Enter Email IDs
            </span>
          ) : (
            <div className="flex flex-wrap">
              {emailsList.map((email, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex bg-blue-700  items-center p-1 m-1 rounded-full text-white border"
                  >
                    <span className="px-1 text-sm">{email}</span>
                    <span
                      onClick={() => handleDeleteEmail(idx)}
                      className="cursor-pointer hover:bg-blue-400 hover:text-slate-100 p-1 rounded-full"
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
              className="bg-blue-700  p-2 font-semibold text-base whitespace-nowrap rounded-full text-slate-100 hover:bg-blue-500 active:bg-blue-200 active:text-slate-900 disabled:bg-blue-200 disabled:text-blue-400"
            >
              Send Form Link
            </button>
          </div>

          {sending && (
            <div className="flex justify-center">
              <span className="text-xl text-blue-700 font-bold tracking-widest">
                SENDING . . .
              </span>
            </div>
          )}

          {/* {hasSubmitted && !sending && (
            <div className="flex justify-center">
              <span className="text-xl text-blue-700">
                Form Links Sent Succesfully !!
              </span>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default SendByEmail;
