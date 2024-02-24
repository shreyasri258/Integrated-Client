import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteForm, getFormFromServer } from "../store/slices/newForm";
import Badge from "../Admin/ui/Badge";
import copy from "clipboard-copy";
import { MdContentCopy } from "react-icons/md";
import LoadingSpinner from "./LoadingSpinner";
import Switch from "../Admin/ui/Switch";
import Sidebar from "../Components/Sidebar/Sidebar";
import SidebarItem from "../Components/Sidebar/SidebarItem";
import { PiNotepad } from "react-icons/pi";
import { FaWpforms } from "react-icons/fa";
import { HiViewBoards } from "react-icons/hi";
import { VscGraph } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { getForm, setForm } from "../store/slices/viewSubmissions";
import { useDispatch, useSelector } from "react-redux";

function ViewFormDetails() {
  const { formId } = useParams();
  const form = useSelector(getForm);
  const [isLoading, setIsLoading] = useState(true);
  const [acceptingStatus, setAcceptingStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CLIENT_URL = import.meta.env.VITE_REACT_APP_CLIENT_URL;

  useEffect(() => {
    async function setFormObj() {
      setIsLoading(true);
      const newForm = await getFormFromServer(formId);
      dispatch(setForm(newForm));
      setAcceptingStatus(newForm.accepting);
      setIsLoading(false);
    }

    setFormObj();
  }, [formId, dispatch]);

  async function handleDelete(formId) {
    const res = await deleteForm(formId);
    if (res.status === 200) {
      navigate("/dashboard");
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative ml-64">
      <Sidebar>
        <SidebarItem type={"title"} content={form.title} />

        <SidebarItem
          type={"info"}
          icon={<FaWpforms color="rgb(99 102 241)" fontSize={"1.3rem"} />}
          label={"Questions"}
          info={form.questions.length}
        />

        <SidebarItem
          type={"info"}
          icon={<PiNotepad color="rgb(99 102 241)" fontSize={"1.3rem"} />}
          label={"Responses"}
          info={form.ansForms.length}
        />

        <hr className="my-3 " />

        <SidebarItem
          type={"link"}
          selectedIcon={
            <HiViewBoards color="rgb(255 255 255)" fontSize={"1.3rem"} />
          }
          unselectedIcon={
            <HiViewBoards color="rgb(99 102 241)" fontSize={"1.3rem"} />
          }
          label={"View"}
          to="submissions"
        />

        <SidebarItem
          type={"link"}
          unselectedIcon={
            <VscGraph color="rgb(99 102 241)" fontSize={"1.3rem"} />
          }
          selectedIcon={
            <VscGraph color="rgb(255 255 255)" fontSize={"1.3rem"} />
          }
          label={"Stats"}
          to="stats"
        />

        <SidebarItem
          type={"link"}
          unselectedIcon={
            <AiOutlineMail color="rgb(99 102 241)" fontSize={"1.3rem"} />
          }
          selectedIcon={
            <AiOutlineMail color="rgb(255 255 255)" fontSize={"1.3rem"} />
          }
          label={"Email"}
          to="sendByEmail"
        />

        <hr className="my-3" />

        <div className="flex p-2">
          <button
            onClick={() => copy(`${CLIENT_URL}/ansForm/${form._id}`)}
            className={`hover:ring-4 active:ring-8 active:ring-indigo-400 hover:ring-indigo-200 rounded-full transition-all hover:duration-300 active:duration-150 ease-in-out`}
          >
            <MdContentCopy color="rgb(99 102 241)" fontSize={"1.3rem"} />
          </button>
          <span className="px-2 text-base text-indigo-600">Form Link</span>
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
            startState={acceptingStatus}
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
  );
}

export default ViewFormDetails;
