import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoleSelection from "./GeneralFiles/RoleSelection";
import LoginRegister from "./GeneralFiles/LoginRegister";
import AdminRegister from "./Admin/AdminRegister";
import StudentRegister from "./User/StudentRegister";
import { GlobalStateProvider } from "./GlobalState";
import StudentLogin from "./User/StudentLogin";
import AdminLogin from "./Admin/AdminLogin";
import LoginHandler from "./GeneralFiles/LoginHandler";
//import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./User/StudentDashboard";
import Exam from "./ExamChecks/Exam";
import Landing from "./landing/Landing";
import Instructions from "./User/Instructions";
import RegisterHandler from "./GeneralFiles/RegisterHandler";
import Home from "./Admin/Home";
import NewForm from "./Admin/NewForm";
import ViewFormDetails from "./Admin/ViewFormDetails";
import PerPersonSubmissions from './Admin/PerPersonSubmissions';
import PerQuestionStats from './Admin/PerQuestionStats'; 
import AnsForm from './Admin/AnsForm';
import Submitted from './Admin/Submitted';
import SendByEmail from './Admin/SendByMail';
import ExamReport from "./Admin/ExamReport";
import viewResultDetail from "./Admin/ViewResultDetail";
import axios from 'axios';
import Footer from './Admin/ui/Footer';

// Axios interceptor to handle server errors
axios.interceptors.response.use(
  response => response,
  error => {
     if (error.response.status >= 500) {
      // Server error
      toast.error('Server error occurred');
    }
    return Promise.reject(error);
  }
);

const App = () => {
  useEffect(() => {
    // Global error handler
    window.addEventListener('error', (event) => {
      // Check if the error is a network error
      if (event.error && event.error.message.includes('net::ERR_CONNECTION_REFUSED')) {
        // Display a toast for the connection error
        toast.error('Server connection refused. Please try again later.');
      }
    });
  }, []);
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/register" element={<RegisterHandler />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/teacher-register" element={<AdminRegister />} />
          <Route path="/login" element={<LoginHandler />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<Home/>} />
          {/* <Route path="/admin-dashboard2" element={<AdminDashboard/>} /> */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/view-results/:formId" element={<viewResultDetail />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/create-form" element={<NewForm />} />
          <Route path="/ansform/:formId" element={<AnsForm />} />
          <Route path="/ansform/submitted" element={<Submitted />} />
          <Route path="formDetails/:formId" element={<ViewFormDetails />} >
            <Route path="submissions" element={<PerPersonSubmissions />} />
            <Route path="stats" element={<PerQuestionStats />} />
            <Route path="sendbymail" element={<SendByEmail />} />
            <Route path="examreport" element={<ExamReport />} />
          </Route>
          <Route path="/exam/:title/:duration/:url" element={<Exam />} />
          {/* Dynamic route with parameters */}
        </Routes>
        <Footer></Footer>
      </Router>
      
      <ToastContainer />
    </GlobalStateProvider>
  );
};

export default App;
