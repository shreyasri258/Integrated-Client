import Icon from '../images/Icon.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { StudentContext } from "../contextCalls/studentContext/StudentContext";
import { login } from "../contextCalls/studentContext/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(StudentContext);
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!isFormValid()) {
        toast.error("Please fill in both email and password fields");
        return;
      }
      await login(inputValues, dispatch, navigate);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  const isFormValid = () => {
    return inputValues.email && inputValues.email.trim() !== "" &&
           inputValues.password && inputValues.password.trim() !== "" &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email);
  };

  const handleButtonHover = () => {
    if (!isFormValid()) {
      toast.error("Please fill in both email and password fields");
    }
  };

  return (
    <div className="user-login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <ToastContainer />
      <div className="logo" style={{ marginBottom: '20px' }}>
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form" style={{ border: '1px solid #ccc', borderRadius: '14px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
        <h1 className="title-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>Examinee Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email"
              value={inputValues.email || ""}
              onChange={(value) => handleInputChange("email", value)}
              style={{ marginBottom: '10px' }}
            />
            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email) && ( <span className='text-center' style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}> Invalid email format </span> )}
            <input
              type="password"
              placeholder="Password"
              value={inputValues.password || ""}
              onChange={(value) => handleInputChange("password", value)}
              style={{ marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={!isFormValid()} style={{ width: '100%' }} onMouseEnter={handleButtonHover}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
