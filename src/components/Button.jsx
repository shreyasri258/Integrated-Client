import React from 'react';

const Button = ({ isDisabled, onClick, children }) => {
 return (
    <button
      id="button"
      disabled={isDisabled}
      onClick={onClick}
      style={{
        padding: '25px',
        backgroundColor: isDisabled ? '#ccc' : '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
 );
};

export default Button;


/*
<Button isDisabled={false} onClick={handleClick}>Save</Button>
<Button isDisabled={false} onClick={handleClick}>Next</Button>
we just have to replace the handleClick function with the actual function
*/