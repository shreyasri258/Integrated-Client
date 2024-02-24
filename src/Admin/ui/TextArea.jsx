import { useEffect, useRef } from "react";

function TextArea({
  classes,
  placeholder,
  value,
  onChange,
  hasMessage,
  rows = "1",
}) {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      className={` overflow-hidden focus:outline-none ${classes}  ${
        hasMessage && "border-rose-500"
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      ref={textAreaRef}
    />
  );
}

export default TextArea;
