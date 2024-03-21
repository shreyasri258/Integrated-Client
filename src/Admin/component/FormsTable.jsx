import PropTypes from "prop-types";
import { MdContentCopy } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import copy from "clipboard-copy";
import { useState } from "react";
import Badge from "../ui/Badge";
import { useNavigate } from "react-router-dom";
import { getDate } from "../utils/index";
import axios from "axios";
import { postToStudents } from "../../store/slices/newForm";


import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

function FormsTable({ displayForms, setDisplayForms }) {
  const [order, setOrder] = useState("ASC");
  const [copied, setCopied] = useState({ show: false }); // State to track if copied box should be shown and its position

  const navigate = useNavigate();

  //const CLIENT_URL = `http://localhst:8800`//'http://localhost:8081';
  const BASE_URL = "http://localhost:8800"; // 8081
  const handlePost = async (formId) => {
    const res = await postToStudents(formId);
    if (res) {
      console.log("form updated");
      const updatedForms = displayForms.map((form) =>
        form._id === formId ? { ...form, posted: !form.posted } : form
      );
      setDisplayForms(updatedForms);
      window.location.reload(); // Reload the page
    }
  };

  const handleCopy = (formId) => {
    copy(`${`http://localhost:5173`}/ansForm/${formId}`);
    toast.success("Copied", { position: "top-right" }); // Show a success toast
  };
  function sortByTitles() {
    if (order === "ASC") {
      const sortedForm = displayForms.sort((a, b) => {
        const title1 = a.title.toLowerCase();
        const title2 = b.title.toLowerCase();

        if (title1 < title2) return -1;
        if (title1 > title2) return 1;
        return 0;
      });

      setDisplayForms([...sortedForm]);
      setOrder("DSC");
    } else {
      const sortedForm = displayForms.sort((a, b) => {
        const title1 = a.title.toLowerCase();
        const title2 = b.title.toLowerCase();

        if (title1 > title2) return -1;
        if (title1 < title2) return 1;
        return 0;
      });

      setDisplayForms([...sortedForm]);
      setOrder("ASC");
    }
  }
  function sortByQuestions() {
    if (order === "ASC") {
      const sortedForms = displayForms.sort(
        (a, b) => a.questions.length - b.questions.length
      );
      setDisplayForms([...sortedForms]);
      setOrder("DSC");
    } else {
      const sortedForms = displayForms.sort(
        (a, b) => b.questions.length - a.questions.length
      );
      setDisplayForms([...sortedForms]);
      setOrder("ASC");
    }
  }

  function sortByResponses() {
    if (order === "ASC") {
      const sortedForms = displayForms.sort(
        (a, b) => a.ansForms.length - b.ansForms.length
      );
      setDisplayForms([...sortedForms]);
      setOrder("DSC");
    } else {
      const sortedForms = displayForms.sort(
        (a, b) => b.ansForms.length - a.ansForms.length
      );
      setDisplayForms([...sortedForms]);
      setOrder("ASC");
    }
  }

  function sortByDate() {
    if (order === "ASC") {
      const sortedForm = displayForms.sort((a, b) => {
        const date1 = new Date(a.created);
        const date2 = new Date(b.created);

        if (date1 < date2) return -1;
        if (date1 > date2) return 1;
        return 0;
      });

      setDisplayForms([...sortedForm]);
      setOrder("DSC");
    } else {
      const sortedForm = displayForms.sort((a, b) => {
        const date1 = new Date(a.created);
        const date2 = new Date(b.created);

        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
      });

      setDisplayForms([...sortedForm]);
      setOrder("ASC");
    }
  }
  function sortByDuration() {
    if (order === "ASC") {
      const sortedForms = displayForms.sort(
        (a, b) => a.timeDuration - b.timeDuration
      );
      setDisplayForms([...sortedForms]);
      setOrder("DSC");
    } else {
      const sortedForms = displayForms.sort(
        (a, b) => b.timeDuration - a.timeDuration
      );
      setDisplayForms([...sortedForms]);
      setOrder("ASC");
    }
  }

  function sortByStatus() {
    if (order === "ASC") {
      const sortedForms = displayForms.sort((a, b) => {
        if (a.accepting && !b.accepting) return -1;
        if (!a.accepting && b.accepting) return 1;
        return 0;
      });
      setDisplayForms([...sortedForms]);
      setOrder("DSC");
    } else {
      const sortedForms = displayForms.sort((a, b) => {
        if (a.accepting && !b.accepting) return 1;
        if (!a.accepting && b.accepting) return -1;
        return 0;
      });
      setDisplayForms([...sortedForms]);
      setOrder("ASC");
    }
  }

  function sortByPosted() {
    if (order === "ASC") {
      const sortedForms = displayForms.sort((a, b) => {
        if (a.postedForStudents && !b.postedForStudents) return -1;
        if (!a.postedForStudents && b.postedForStudents) return 1;
        return 0;
      });
      setDisplayForms([...sortedForms]);
      setOrder("DSC");
    } else {
      const sortedForms = displayForms.sort((a, b) => {
        if (a.postedForStudents && !b.postedForStudents) return 1;
        if (!a.postedForStudents && b.postedForStudents) return -1;
        return 0;
      });
      setDisplayForms([...sortedForms]);
      setOrder("ASC");
    }
  }

  return (
    <div>
      {/* Place the ToastContainer at a high level in your component hierarchy */}
      <ToastContainer

position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  
  rtl={false}
 
  draggable
  
  
 
/>

      {copied.show && (
        <div className="p-3 text-xl tracking-wide text-blue-700 font-bold">
          Copied
        </div>
      )}
      <table
        className="w-full max-w-full"
        style={{ width: "1250px", borderRadius: "8px" }}
      >
        {/* Table header */}
        <thead className="p-6 bg-blue-500 border border-blue-600 ">
          <tr className="text-black-200 ">
            <th className="p-3 font-semibold tracking-wide text-center">
              <span>No.</span>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByTitles}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Title</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByDuration}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Duration</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 w-40 font-semibold tracking-wide text-center">
              <div
                onClick={sortByDate}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Created</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByQuestions}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Questions</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByResponses}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Responses</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <span>Form Link</span>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <span>View</span>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByStatus}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Status</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
            <th className="p-3 font-semibold tracking-wide text-center">
              <div
                onClick={sortByPosted}
                className="flex justify-center items-center cursor-pointer hover:underline underline-offset-4 transition-all duration-300 ease-in-out"
              >
                <span>Posted</span>
                <span>
                  <BiSort fontSize={"1.4rem"} />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayForms.map((form, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg--200" : ""
              } border-x-2 border border-blue-600`}
            >
              <td className="p-3 tracking-wide text-center">{idx + 1}</td>
              <td className="p-3 tracking-wide text-center">{form.title}</td>
              <td className="p-3 tracking-wide text-center">
                {form.timeDuration} min
              </td>
              <td className="p-3 tracking-wide text-center">
                {getDate(form.created)}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.questions.length}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.ansForms.length}
              </td>
              <td
                className="p-3 tracking-wide text-center"
                style={{ position: "relative" }}
              >
                <button
                  style={{ background: "none", color: "#0a2147" }}
                  onClick={(e) => handleCopy(form._id, e.clientX, e.clientY)}
                  className={`hover:ring-8 bg-red-400 rounded-full hover:transition-all duration-500 ease-in-out`}
                >
                  <MdContentCopy fontSize={"1.5rem"} />
                </button>
              </td>
              <td className="p-3 tracking-wide text-center">
                <button
                  style={{ background: "none", color: "#0a2147" }}
                  onClick={() =>
                    navigate(`/formDetails/${form._id}/submissions`)
                  }
                  className={`hover:ring-8 bg-red-400 rounded-full hover:transition-all duration-500 ease-in-out`}
                >
                  <BsEyeFill fontSize={"1.5rem"} />
                </button>
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.accepting ? (
                  <Badge type={"accept"}>accepting</Badge>
                ) : (
                  <Badge type={"reject"}>closed</Badge>
                )}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.postedForStudents ? (
                  <Badge type={"accept"} onClick={() => handlePost(form._id)}>
                    Posted
                  </Badge>
                ) : (
                  <button
                    onClick={() => handlePost(form._id)}
                    className={`rounded-md px-2 py-1 text-white`}
                  >
                    Post
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
FormsTable.propTypes = {
  displayForms: PropTypes.array.isRequired,
  setDisplayForms: PropTypes.func.isRequired,
};

export default FormsTable;
