import React, { useState } from 'react';
import '../css/UserRegister.css';
import Icon from '../images/Icon.png';
import { Link } from 'react-router-dom';
import axios from "axios";

const AdminRegister = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      await axios.post("http://localhost:8800/Server/admin/register", data);
      setShowModal(true);
      console.log("Registration successful!");
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  console.log("showModal:", showModal); // Add this line for debugging

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
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit">Register</button>
        </form>
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
