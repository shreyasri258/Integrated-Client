import React, { useContext } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../GlobalState';
import '../css/LoginRegister.css';

const LoginRegister = () => {
 const { selectedRole } = useContext(GlobalStateContext);
 const navigate = useNavigate();

 const handleLogin = () => {
  if (selectedRole === 'student') {
     navigate('/student-login');
  } else if (selectedRole === 'teacher') {
     navigate('/teacher-login');
  }
 };
 

 const handleRegister = () => {
   if (selectedRole === 'student') {
      navigate('/student-register');
   } else if (selectedRole === 'teacher') {
      navigate('/teacher-register');
   }
};
 

return (
  <div className="buttonBox">
    <Button isDisabled={false} onClick={handleLogin} className="button">Login</Button>
    <span className="or-text">Or</span>
    <Button isDisabled={false} onClick={handleRegister} className="button">Register</Button>
 </div>
 );
 
};

export default LoginRegister;
