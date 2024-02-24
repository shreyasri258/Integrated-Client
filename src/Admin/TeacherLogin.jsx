import '../css/TeacherLogin.css';
import Icon from '../images/Icon.png';
import CommonInput from '../GeneralFiles/CommonInput';
// import CtaButton from './CtaButton';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AdminContext } from "../contextCalls/adminContext/AdminContext";
import { login } from "../contextCalls/adminContext/apiCalls";


const inputField = ['email', 'adminname', 'password', 'institutionName'];

const TeacherLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const [inputFieldValues, setInputFieldValues] = useState({});
  // let navigate = useNavigate();
  const navigate = useNavigate();

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };


  const handleLogin = (e) => {
  
    e.preventDefault();
    // console.log('Input field values:', inputFieldValues);
    try{
    login( inputFieldValues , dispatch);
    setIsLoggedIn(true);
    navigate("/admin-dashboard");
    } catch(err){
      console.log(err);
    }
      //  navigate("/admin-dashboard");
      console.log('Input field values:', inputFieldValues);
   };
   
  return (
    <div className="user-login">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">Examiner Login</h1>
        <div className="input-fields">
        {inputField.map((item) => (
            <CommonInput
              key={item}
              placeholderText={item}
              onChange={(value) => handleInputChange(item, value)}
            />
          ))}
        </div>

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
 );
};

export default TeacherLogin;
