import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteForm, getFormFromServer } from "../store/slices/newForm";
import Badge from "./ui/Badge";
import copy from "clipboard-copy";
 import { MdContentCopy } from "react-icons/md";
 import { PiExamLight } from "react-icons/pi";
import LoadingSpinner from "./LoadingSpinner";
import Switch from "./ui/Switch";
import Sidebar from "./component/Sidebar/Sidebar";
import SidebarItem from "./component/Sidebar/SidebarItem";
import { PiNotepad } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { HiViewBoards } from "react-icons/hi";
import { VscGraph } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { getForm, setForm } from "../store/slices/viewSubmissions";
import UniversalNavbar from "./universalNavbar";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewFormDetails() {
  const { formId } = useParams();
  const form = useSelector(getForm);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingStatus, setAcceptingStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);


  const CLIENT_URL = 'http://localhost:8081';

 
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    async function setFormObj() {
      setIsLoading(true);
      const newForm = await getFormFromServer(formId);
      console.log('newForm client - ',newForm);
      dispatch(setForm(newForm));
      setAcceptingStatus(newForm.accepting);
      setIsLoading(false);
    }

    setFormObj();
  }, [formId, dispatch]);

  async function handleDelete(formId) {
    const res = await deleteForm(formId);
    if (res.status === 200) {
      navigate("/admin-dashboard");
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleCopy = () => {
    const link = `${`http://localhost:5173`}/ansForm/${form._id}`;
    copy(link);
    toast.success("Copied");
  };

console.log('form-details -> ',form);
return (
  <>
  <ToastContainer />
    <UniversalNavbar />
    <div className="relative ml-64">
      <Sidebar className="bg-blue-500">
        <SidebarItem
          type={"title"}
          content={
            form.title.length > 100
              ? (
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={form.title}
                >
                  {`${form.title.slice(0, 100)}...`}
                </span>
              )
              : form.title
          }
        />

        <SidebarItem
          type={"info"}
          icon={<FaWpforms style={{ color: "#0a2147" }} fontSize={"1.3rem"} />}
          label={"Questions"}
          info={form.questions.length}
        />

        <SidebarItem
          type={"info"}
          icon={<PiNotepad style={{ color: "#0a2147" }} fontSize={"1.3rem"} />}
          label={"Responses"}
          info={form.ansForms.length}
        />

        <hr className="my-2 " />

        <SidebarItem
          type={"link"}
          selectedIcon={
            <HiViewBoards style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          unselectedIcon={
            <HiViewBoards style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          label={"View"}
          to={`/formDetails/${formId}/submissions`}
        />

        <SidebarItem
          type={"link"}
          unselectedIcon={
            <VscGraph style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          selectedIcon={
            <VscGraph style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          label={"Stats"}
          to={`/formDetails/${formId}/stats`}
        />

        <SidebarItem
          type={"link"}
          unselectedIcon={
            <AiOutlineMail style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          selectedIcon={
            <AiOutlineMail style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          label={"Email"}
          to={`/formDetails/${formId}/sendbymail`}
        />
        <SidebarItem
          type={"link"}
          unselectedIcon={
            <PiExamLight style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          selectedIcon={
            <PiExamLight style={{ color: "#0a2147" }} fontSize={"1.3rem"} />
          }
          label={"Exam Report"}
          to={`/formDetails/${formId}/examreport`}
        />

        <hr className="my-2" />

        <div className="justify-start -ml-3">
  <button
    className="flex items-center bg-transparent hover:bg-blue-300 justify-start w-full rounded-md"
    onClick={handleCopy}
  >
    <MdContentCopy className="text-blue-900" />
    <span className="text-md ml-1 text-blue-700">Copy Form Link</span>
  </button>
</div>


        <div className="flex items-center p-2 justify-between ">
          {acceptingStatus ? (
            <Badge type={"accept"}>accepting</Badge>
          ) : (
            <Badge type={"reject"}>closed</Badge>
          )}
          <Switch
            type={"toggleFormStatus"}
            formId={form._id}
            startState={acceptingStatus.toString()}
            setStatus={setAcceptingStatus}
          />
        </div>

        <div className=" flex p-2 justify-center">
          <button
            onClick={() => handleDelete(formId)}
            className="uppercase p-1.5 font-bold bg-rose-200 rounded-md tracking-wide text-base text-rose-500  hover:bg-rose-500 hover:text-white transition-all duration-300 ease-in-out"
          >
            Delete Form
          </button>
        </div>
      </Sidebar>
      <div>
        <Outlet context={form} />
      </div>
    </div>
  </>
);

}

export default ViewFormDetails;
