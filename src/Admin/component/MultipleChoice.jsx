import RadioButton from "../ui/RadioButton";

function MultipleChoice({ options, ansIdx }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option, idx) => {
        return (
          <RadioButton
            type={"show-ans"}
            ansIdx={ansIdx}
            option={option}
            idx={idx}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default MultipleChoice;
