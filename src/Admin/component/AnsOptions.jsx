import CheckBoxes from "./CheckBoxes";
import DropDown from "./DropDown";
import MultipleChoice from "./MultipleChoice";

function AnsOptions({ type, options, ansIdx }) {
  return (
    <div className="m-3">
      {type === "multiple-choice" && (
        <MultipleChoice options={options} ansIdx={ansIdx} />
      )}
      {type === "check-boxes" && (
        <CheckBoxes options={options} ansIdx={ansIdx} />
      )}
      {type === "dropdown" && <DropDown options={options} ansIdx={ansIdx} />}
    </div>
  );
}

export default AnsOptions;
