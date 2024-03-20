import Icon from '../images/Icon.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AdminContext } from "../contextCalls/adminContext/AdminContext";
import { login } from "../contextCalls/adminContext/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons


const TeacherLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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

  return (
    <div className="user-login flex flex-col items-center justify-center h-screen">
      <ToastContainer />
      <div className="logo mb-20">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form border border-gray-300 rounded-lg p-5 shadow-md">
        <h1 className="title-heading text-center mb-5">Examiner Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-fields flex flex-col mb-5 relative">
          <input
  type="email"
  placeholder="Email"
  value={inputValues.email || ""}
  onChange={(value) => handleInputChange("email", value)}
  style={{
    marginBottom: '10px',
    border: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email) ? '1px solid red' : '1px solid #ccc',
    transition: 'border-color 0.3s',
  }}
/>
{!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email) && (
  <span className='text-center' style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}> Invalid email format </span>
)}
             <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={inputValues.password || ""}
                onChange={(event) => handleInputChange("password", event)}
                className="mb-5 pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-2 top-2 cursor-pointer bg-transparent border-none text-black"
            
               >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
           

            <button type="submit" disabled={!isFormValid()} className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
