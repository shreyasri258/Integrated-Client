import { useDispatch, useSelector } from "react-redux";
import { getAns, setAns } from "../../store/slices/ansForm";
import { useEffect, useRef, useState } from "react";

function DropDown({ options, ansIdx }) {
  const ans = useSelector(getAns(ansIdx));
  const dispatch = useDispatch();
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <div className="flex">
      <div className="relative">
        <button
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          className="bg-indigo-500 text-white p-2 w-52 rounded-md hover:bg-indigo-600 text-sm"
        >
          <span className="">Select Answer</span>
          <span className=""> &#8595;</span>
        </button>

        <div
          className={`absolute bg-indigo-50 mt-2 left-0 right-0 ${
            isSelectOpen ? "flex flex-col" : "hidden"
          } `}
        >
          {options.map((option, idx) => {
            return (
              <span
                className="p-2 hover:bg-indigo-400 hover:text-white cursor-pointer text-sm"
                key={idx}
                onClick={() => {
                  dispatch(setAns({ ansIdx, ans: idx }));
                  setIsSelectOpen(false);
                }}
              >
                {option || (
                  <span className="italic text-slate-500">Empty Option</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      <span className="self-center ml-6 text-base border-b-2 border-indigo-600">
        {options[ans] || (
          <span className="italic text-slate-500">Empty Option</span>
        )}
      </span>
    </div>
  );
}

export default DropDown;

/* <select
        value={ans}
        onChange={(e) =>
          dispatch(setAns({ ansIdx, ans: Number(e.target.value) }))
        }
      >
        <option value={undefined} key={options.length}>
          Select an Option
        </option>
        {options.map((option, idx) => {
          return (
            <option value={idx} key={idx}>
              {option}
            </option>
          );
        })}
      </select> */
