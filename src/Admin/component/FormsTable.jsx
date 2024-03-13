import PropTypes from "prop-types";
import { MdContentCopy } from "react-icons/md";
import { BsEyeFill } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import copy from "clipboard-copy";
import { useState } from "react";
import Badge from "../ui/Badge";
import { useNavigate } from "react-router-dom";
import { getDate } from "../utils/index";
import axios from 'axios'
import {postToStudents} from "../../store/slices/newForm"

function FormsTable({ displayForms, setDisplayForms }) {
  const [order, setOrder] = useState("ASC");
  const navigate = useNavigate();
  
  //const CLIENT_URL = `http://localhst:8800`//'http://localhost:8081';
  const BASE_URL = 'http://localhost:8800'; // 8081
  const handlePost = async (formId) => {
    const res = await postToStudents(formId);
    if (res) {
      console.log('form updated');
      const updatedForms = displayForms.map((form) =>
        form._id === formId ? { ...form, posted: !form.posted } : form
      );
      setDisplayForms(updatedForms);
    }
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

  return (
    <table className="w-full max-w-full " style={{ width: '1250px' }}>
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
            <span>Duration</span>
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
            <span>Questions</span>
          </th>
          <th className="p-3 font-semibold tracking-wide text-center">
            <span>Responses</span>
          </th>
          <th className="p-3 font-semibold tracking-wide text-center">
            <span>Status</span>
          </th>
          <th className="p-3 font-semibold tracking-wide text-center">
            <span>Form Link</span>
          </th>
          <th className="p-3 font-semibold tracking-wide text-center">
            <span>View</span>
          </th>
          <th className="p-3 font-semibold tracking-wide text-center">
            <span>Posted</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {displayForms.map((form, idx) => {
          console.log('form in dashboard - ', form);
          return (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg--200" : ""
              } border-x-2 border border-blue-600`}
            >
              <td className="p-3 tracking-wide text-center">{idx + 1}</td>
              <td className="p-3 tracking-wide text-center">{form.title}</td>
              <td className="p-3 tracking-wide text-center">{form.timeDuration} min</td>
              <td className="p-3 tracking-wide text-center">
                {getDate(form.created)}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.questions.length}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.ansForms.length}
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.accepting ? (
                  <Badge type={"accept"}>accepting</Badge>
                ) : (
                  <Badge type={"reject"}>closed</Badge>
                )}
              </td>
              <td className="p-3 tracking-wide text-center">
                <button
                style={{ background: "none",color:"#0a2147"}}
                  onClick={() => copy(`${`http://localhost:5173`}/ansForm/${form._id}`)}
                  className={`hover:ring-8  bg-red-400 rounded-full hover:transition-all duration-500 ease-in-out`}
                >
                  <MdContentCopy fontSize={"1.5rem"} />
                </button>
              </td>
              <td className="p-3 tracking-wide text-center">
                <button
                style={{ background: "none",color:"#0a2147"}}
                  onClick={() =>
                    navigate(`/formDetails/${form._id}/submissions`)
                  }
                  className={`hover:ring-8 bg-red-400
                 
                  active: rounded-full hover:transition-all duration-500 ease-in-out`}
                >
                  <BsEyeFill fontSize={"1.5rem"} color="" />
                </button>
              </td>
              <td className="p-3 tracking-wide text-center">
                {form.postedForStudents ? (
                  <Badge type={"accept"} onClick={() => handlePost(form._id)}>Posted</Badge>
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
          );
        })}
      </tbody>
    </table>
  );
}

FormsTable.propTypes = {
  displayForms: PropTypes.array.isRequired,
  setDisplayForms: PropTypes.func.isRequired,
};

export default FormsTable;
