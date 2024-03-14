import { useDispatch } from "react-redux";
import { setAns } from "../../store/slices/ansForm";
import { useEffect, useState } from "react";
import CheckBox from "../ui/CheckBox";

function CheckBoxes({ options, ansIdx }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length > 0) {
      dispatch(setAns({ ansIdx, ans: selected }));
    } else {
      dispatch(setAns({ ansIdx, ans: undefined }));
    }
  }, [selected, ansIdx, dispatch]);

  return (
    <div className="flex flex-col gap-3">
      {options.map((option, idx) => {
        return (
          <CheckBox
            type={"show-ans"}
            option={option}
            idx={idx}
            selected={selected}
            setSelected={setSelected}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default CheckBoxes;
