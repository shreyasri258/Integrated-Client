import '../css/StudentLogin.css';
import Icon from '../images/Icon.png';
import CommonInput from '../GeneralFiles/CommonInput';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { StudentContext } from "../contextCalls/studentContext/StudentContext";
import { login } from "../contextCalls/studentContext/apiCalls";

const inputField = ['email', 'username', 'password', 'institutionName'];

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
      await login(inputValues, dispatch);
      setIsLoggedIn(true);
      navigate("/student-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const isFormValid = Object.values(inputValues)//.every(value => value.trim() !== "");

  return (
    <div className="user-login">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="login-form">
        <h1 className="title-heading">Examinee Login</h1>
        <div className="input-fields">
          {inputField.map((item) => {
            let type;
            switch (item) {
              case "email":
                type = "email";
                break;
              case "username":
                type = "text";
                break;
              case "password":
                type = "password";
                break;
              case "institutionName":
                type = "text";
                break;
              default:
                type = "text";
            }
            return (
              <CommonInput
                key={item}
                placeholderText={item}
                value={inputValues[item] || ""}
                onChange={(value) => handleInputChange(item, value)}
                type={type}
              />
            );
          })}
        </div>
        <button onClick={handleLogin} disabled={!isFormValid}>Login</button>
      </div>
    </div>
  );
};

export default StudentLogin;
