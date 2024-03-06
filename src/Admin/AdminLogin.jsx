import '../css/TeacherLogin.css';
import Icon from '../images/Icon.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AdminContext } from "../contextCalls/adminContext/AdminContext";
import { login } from "../contextCalls/adminContext/apiCalls";




const TeacherLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const [inputValues, setInputValues] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try{
    await login( inputValues , dispatch);
    setIsLoggedIn(true);
    navigate("/admin-dashboard");
    } catch(err){
      console.log(err);
    }
   };
   
     const isFormValid = () => {
    // Check if email and password fields are not empty and email is valid
    return inputValues.email && inputValues.email.trim() !== "" &&
           inputValues.password && inputValues.password.trim() !== "" &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email);
  };


  return (
    <div className="user-login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
           <div className="logo" style={{ marginBottom: '20px' }}>
             <img src={Icon} alt="proctorpal-logo" />
           </div>
           <div className="login-form" style={{ border: '1px solid #ccc', borderRadius: '14px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
             <h1 className="title-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>Examiner Login</h1>
             <form onSubmit={handleLogin}>
               <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                 <input
                  type="email"
                  placeholder="Email"
                  value={inputValues.email || ""}
                  onChange={(value) => handleInputChange("email", value)}
                  style={{ marginBottom: '10px' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={inputValues.password || ""}
                  onChange={(value) => handleInputChange("password", value)}
                  style={{ marginBottom: '10px' }}
                />
              </div>
              <button type="submit" disabled={!isFormValid()} style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        </div>
      
 );
};

export default TeacherLogin;



