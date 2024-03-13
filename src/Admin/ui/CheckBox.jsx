import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function CheckBox({
  option,
  idx,
  selected=[],
  setSelected,
  disabled,
  type,
  answers,
}) {
  const [isChecked, setIsChecked] = useState(selected.includes(idx));

  useEffect(() => {
    setIsChecked(selected.includes(idx));
  }, [selected, idx]);

  function handleClick() {
    if (!isChecked) {
      setSelected([...selected, idx]);
    } else {
      setSelected(selected.filter((item) => item !== idx));
    }
  }

  return (
    <div
      className="flex items-center"
      onClick={() => {
        if (!disabled) {
          handleClick();
        }
      }}
    >
      <div
        className={`h-4 w-4 flex rounded-md justify-center items-center border-2 border-blue-500 ${
          isChecked && "bg-blue-400"
        } ${
          !disabled && "hover:ring-8 cursor-pointer"
        } ring-blue-300 transition-all duration-300 ease-in-out`}
      >
        {isChecked && (
          <span className="text-xs text-white font-semibold ">&#10003;</span>
        )}
      </div>
      {type === "show-ans" && (
        <p className="ml-4 text-base cursor-default">
          {option || (
            <span className="italic text-slate-500">Empty Option</span>
          )}
        </p>
      )}
    </div>
  );
}

//export default CheckBox;


CheckBox.propTypes = {
  option: PropTypes.string.isRequired,
  idx: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default CheckBox;
