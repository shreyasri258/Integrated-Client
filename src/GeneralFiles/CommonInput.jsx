import React from 'react';
import '../css/commoninput.css';

const CommonInput = ({
  placeholderText = 'Input',
  value,
  onChange,
  type = 'text' // Default type is 'text'
}) => {
  return (
    <input
      type={type} // Use the type prop to determine the input type
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
    />
  );
};

export default CommonInput;