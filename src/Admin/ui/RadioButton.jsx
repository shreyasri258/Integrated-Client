import { useDispatch, useSelector } from "react-redux";
import { getAns, setAns } from "../../store/slices/ansForm";
import PropTypes from 'prop-types';

import React, { useState } from 'react';

function RadioButton({ ansIdx, option, idx, disabled = false, type, answer }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const dispatch = useDispatch();

  if (answer !== null && answer !== undefined && selectedIdx === null) {
    setSelectedIdx(answer);
  }

  function handleClick() {
    if (selectedIdx === idx) {
      setSelectedIdx(null); // Deselect the option if clicked again
      dispatch(setAns({ ansIdx, ans: null }));
    } else {
      setSelectedIdx(idx);
      dispatch(setAns({ ansIdx, ans: idx }));
    }
  }

  return (
    <div
      className={`flex items-center ${selectedIdx === idx ? 'bg-blue-100' : ''}`}
      onClick={() => {
        if (!disabled) {
          handleClick();
        }
      }}
    >
      <div
        className={`h-4 w-4 flex rounded-full justify-center items-center border-2 border-blue-500 ${
          !disabled && "hover:ring-8 cursor-pointer"
        } ring-blue-300 transition-all duration-300 ease-in-out`}
      >
        {selectedIdx === idx && (
          <div className="h-2 w-2 rounded-full bg-black"></div>
        )}
      </div>
      {type === "show-ans" && (
        <p
          className={`ml-4 text-base cursor-pointer ${selectedIdx === idx ? 'underline' : ''}`}
          onClick={() => {
            if (!disabled) {
              handleClick();
            }
          }}
        >
          {option || (
            <span className="italic text-slate-500">Empty Option</span>
          )}
        </p>
      )}
    </div>
  );
}


//export default RadioButton;










RadioButton.propTypes = {
  ansIdx: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  answer: PropTypes.number,
};

export default RadioButton;
