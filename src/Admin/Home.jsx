import { useEffect, useState } from "react";
import { useAuth } from "../store/UserAuth";
import { getFormsList } from "../store/slices/newForm";

import LoadingSpinner from "../Admin/LoadingSpinner";
import { AiOutlineSearch } from "react-icons/ai";

import FormsTable from "../Admin/component/FormsTable";

function Home() {
  const { user } = useAuth();
  const [formsList, setFormsList] = useState([]);
  const [displayForms, setDisplayForms] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function setForms() {
      setIsLoading(true);
      const temp = await getFormsList();
      if (Array.isArray(temp)) { // Check if temp is an array
        const forms = temp.reverse();
        setFormsList(forms);
        setDisplayForms(forms);
      } else {
        console.error("getFormsList() did not return an array:", temp);
      }
      setIsLoading(false);
    }
    setForms();
  }, []);

  useEffect(() => {
    const newDisplayList = formsList.filter((form, idx) =>
      form.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayForms(newDisplayList);
  }, [search, formsList]);

  // Form: title, num of questions, num of responses, created date, link to ans form, delete form, accepting responses, edit form ?
  // Search by title, sort by: title, created

  if (isLoading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  if (formsList.length === 0) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <h3 className="mb-32 text-lg text-indigo-600">
          Hi , you currently dont have any forms.
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-sm mb-20">
      <div className="w-3/4">
        <div className=" flex items-center justify-between">
          <div className="flex my-3 w-1/2">
            <span className="p-2 bg-white h-full border-y-2 border-l-2 border-indigo-200 rounded-l-full">
              <AiOutlineSearch fontSize="1.3rem" color="rgb(55 48 163)" />
            </span>
            <input
              className="p-2 text-sm focus:outline-none h-full w-full border-y-2 border-r-2 border-indigo-200 rounded-r-full"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {displayForms.length === 0 ? (
          <div className="flex justify-center items-center mt-48">
            <p className="text-lg text-indigo-700">
              No forms whose title contains 
            </p>
          </div>
        ) : (
          <div className="">
            <FormsTable
              displayForms={displayForms}
              setDisplayForms={setDisplayForms}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
