import React, { useState } from 'react';
import '../css/UserRegister.css';
import Icon from '../images/Icon.png';
import CommonInput from '../GeneralFiles/CommonInput';
import { Link } from 'react-router-dom';
import axios from "axios";
const inputField = ['email', 'adminname', 'password', 'institutionName'];



const AdminRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputFieldValues, setInputFieldValues] = useState({});

  const handleInputChange = (fieldName, event) => {
    const value = event.target.value
    setInputFieldValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleRegister = async(e) => {
    // Your registration logic goes here
    e.preventDefault();
    // Access inputFieldValues to get the values of the input fields
    try {
      await axios.post("http://localhost:8800/Server/admin/register",  inputFieldValues );
      // history.push("/login");
    } catch (err) {
      console.error('Registration error:', err);
    }
    console.log('Input field values:', inputFieldValues);
    // After successful registration, show the modal
    setShowModal(true);
    // Clear the inputFieldValues state after registration if needed
    setInputFieldValues({});
  };

  return (
    <div className="user-register">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Examiner Register</h1>
        <div className="input-fields">
        {inputField.map((item) => (
            <CommonInput
              key={item}
              placeholderText={item}
              onChange={(value) => handleInputChange(item, value)}
            />
          ))}
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
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
