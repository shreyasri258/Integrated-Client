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
  const handleButtonHover = () => {
    if (!isFormValid()) {
      toast.error("Please fill in both email and password fields");
    }
  };
  
  const isFormValid = () => {
    return inputValues.email && inputValues.email.trim() !== "" &&
           inputValues.password && inputValues.password.trim() !== "" &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email);
  };

  return (
    <div className="user-login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <ToastContainer />
      <div className="logo" style={{ marginBottom: '20px' }}>
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form  shadow-md" style={{ border: '1px solid #ccc', borderRadius: '14px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
      <h1 className="title-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>Examiner Login</h1>
        <form onSubmit={handleLogin}>
        <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
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
                className="absolute right-2 top-2 cursor-pointer bg-transparent border-none text-black rounded"
            
               >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
           

            <button type="submit" disabled={!isFormValid()} style={{ width: '100%' }} onMouseEnter={handleButtonHover}>Login</button>
       </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
