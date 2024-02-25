import PropTypes from "prop-types";

function CheckBox({
  option,
  idx,
  selected,
  setSelected,
  disabled,
  type,
  answers,
}) {
  let isSelected;
  if (disabled) {
    isSelected = answers?.includes(idx);
  } else {
    isSelected = selected?.includes(idx);
  }

  function handleClick() {
    if (selected.includes(idx)) {
      setSelected((selected) => selected.filter((s) => s !== idx));
    } else {
      setSelected((selected) => [...selected, idx]);
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
        className={`h-4 w-4  ${
          isSelected && "bg-indigo-400"
        } flex border-2 border-indigo-500 rounded-md justify-center items-center ${
          !disabled && "hover:ring-8 cursor-pointer"
        } ring-indigo-300 transition-all duration-300 ease-in-out`}
      >
        {isSelected && (
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
