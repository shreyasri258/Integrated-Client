import React, { useState } from 'react';
import '../css/UserRegister.css';
import Icon from '../images/Icon.png';
import { Link } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({});
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      let res= await axios.post("http://localhost:8800/Server/admin/register", data);
     
      if (res.status === 201) {
        toast.success("Admin registered successfully", { position: "top-right" });
        setShowModal(true);
      }
      //console.log("Registration successful!");
    } catch (err) {
      if (err.response.status === 400) {
        toast.error("Admin is already registered");
      } 
      
      else {
        toast.error("An error occurred. Please try again later.");
      }
      console.error('Registration error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  }

  return (
    <div className="user-register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="logo" >
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form" style={{ border: '1px solid #ccc', borderRadius: '14px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
        <h1 className="title-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>Examiner Register</h1>
        <form onSubmit={handleRegister}>
          <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <input type="text" name="adminname" placeholder="Admin Name" />
            <input type="text" name="institutionName" placeholder="Institution Name" />
            <input type="email" name="email" placeholder="Email" />
            <div className="relative w-full pr-25  px-4 " >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={inputValues.password || ""}
                onChange={(event) => handleInputChange("password", event)}
                
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
           
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <ToastContainer position="top-right" />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>Registration successful!</p>
            <div className="modal-buttons">
              <Link to="/teacher-login">
                <button>Login</button>
              </Link>
              <Link to="/">
                <button>Home Page</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegister;
