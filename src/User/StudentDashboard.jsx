import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Icon from "../images/Icon.png";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import StudentResults from "./StudentResults"; // Import the ResultsTab component
import "../css/userDashboard.css"; // Import the stylesheet
import { StudentContext } from "../contextCalls/studentContext/StudentContext";
import swal from "sweetalert"; 

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [value, setValue] = useState(0);
  const [examData, setExamData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useContext(StudentContext);
  const [adminDetails, setAdminDetails] = useState({ name: "", email: "" });
  const [startedExams, setStartedExams] = useState([]);
  const [buttonProps, setButtonProps] = useState({});

  const handleOpenDetails = () => {
    setAdminDetails({ name: user.user.user.name, email: user.user.user.email });
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
  };

  // Retrieve exam data from local storage on component mount
  const fetchExamData = async () => {
    try {
      const userDetails = user;
      const { institution } = userDetails.user.user;
      const { token } = userDetails;
      console.log(token);
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await axios.get("http://localhost:8800/exams/questionforms", {
        headers: {
          "x-auth-token": token, // Include the token in header
        },
        query: {
          institution: institution, // institution name as  query params
        },
      });
      const examLocalStorage = JSON.parse(localStorage.getItem("exams")) || {};
      const initialButtonProps = {};
      response.data.forEach((exam) => {
        initialButtonProps[exam._id] = examLocalStorage[exam._id]?.isStarted
          ? { color: "error", text: "Test Started" }
          : { color: "primary", text: "Start Test" };
      });
      setButtonProps(initialButtonProps);
      console.log(response.data);
      setExamData(response.data);
    } catch (error) {
      console.error("Error fetching exam data:", error.message);
      toast.error(`Error fetching exam data: ${error.message}`);
    }
  };
  

  const handleStartExamPutCall = async (exam) => {
    try {
      const userDetails = user;
      const { institution , id } = userDetails.user.user;
      const { token } = userDetails;
      console.log('formId in putCall - ',id, token)
      const questionFormId = exam._id
      const response = await axios.put(
        `http://localhost:8800/exams/${id}/start`,
        null,
        {
          headers: {
            "x-auth-token": token, // Include the token in header
          },
        }
      );
      // Update the state with the updated exam data
      if (response.status === 200) {
        // Update local storage with the isStarted status for this exam
        const examLocalStorage = JSON.parse(localStorage.getItem("exams")) || {};
        examLocalStorage[exam._id] = { isStarted: true };
        localStorage.setItem("exams", JSON.stringify(examLocalStorage));

        // Update button properties for this exam in state
        setButtonProps((prevButtonProps) => ({
          ...prevButtonProps,
          [exam._id]: { color: "error", text: "Test Started" },
        }));
      }

      setExamData((prevData) => prevData.map((e) => (e._id === response.data._id ? response.data : e)));
      setStartedExams((prevExams) => [...prevExams, exam._id]);
    } catch (error) {
      console.error("Error starting exam:", error.message);
      toast.error(`Error starting exam: ${error.message}`);
    }
  };
  
  


  useEffect(() => {
    fetchExamData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartExam = (exam) => {
    // Display SweetAlert confirmation dialog
    swal({
      title: "Do you really want to begin the exam?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willStart) => {
      if (willStart) {
        // Proceed to instructions page
        // console.log('exam at client',exam);
        handleStartExamPutCall(exam);
        
        window.open(`/instructions?title=${encodeURIComponent(
        exam.title
      )}&duration=${encodeURIComponent(
        exam.timeDuration
      )}&url=${encodeURIComponent(exam.googleFormLink)}`, "_blank", "noopener noreferrer");
     
        // Remove the exam card from the dashboard
        // setExamData((prevData) => prevData.filter((e) => e !== exam));
        // window.location.reload()
        
      }
    });
  };
  

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
  };
  const handleIconClick = () => {
    console.log("Clickcer")
    window.location.reload();
  };
  
  return (
    <Card>
      <ToastContainer/>
      <div className="icon-container" style={{ position: 'absolute', top: 0, left: 0 }} onClick={handleIconClick}>
        <img
          src={Icon}
          alt="Logo"
          className="logo-image"
          style={{ maxWidth: '50px',marginLeft :"30px",marginTop:"20px", maxHeight: '50px', cursor: 'pointer' }}
          
        />
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        className="dashboard-tabs"
        aria-label="tabs example"
        style={{height:"80px"}}
        sx={{ paddingLeft: '80px' }}
      >
        <Tab className="dashboard-tab" style={{marginTop:"15px"}} label="Available Exams" />
        <Tab className="dashboard-tab" style={{marginTop:"15px"}} label="Results" />
        <Button
          onClick={handleOpenDetails}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            right: 20,
            margin: 1,
            borderRadius: "100%",
            width: "60px", // Set a fixed width to maintain circular shape
            height: "60px", // Set a fixed height to maintain circular shape
            minWidth: "auto",
            boxShadow: "0  4px  8px rgba(0,  0,  0,  0.2)",
          }}
        >
         {adminDetails && adminDetails.name ? adminDetails.name : 'Details'}
        </Button>
        <Modal
          open={open}
          onClose={handleCloseDetails}
          aria-labelledby="admin-details-modal"
          aria-describedby="admin-details-description"
        >
          <Box sx={style}>
            <Typography id="admin-details-modal" variant="h6" component="h2" sx={{marginLeft:12}}>
              Examinee Details
            </Typography >
            <Typography id="admin-details-description" sx={{ mt: 2 ,marginLeft:7}}>
              Name: {adminDetails.name} <br />
              Email: {adminDetails.email}
              <Box sx={{ mt: 3 ,marginLeft:7}}>
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        // Add the logout logic here
        console.log('Logging out...');
      }}
    >
      Logout
    </Button>
    </Box>
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      </Tabs>
  
      <div className="dashboard-content">
      {value === 0 && (
        <div>
          {examData.length === 0 ? (
            <Typography variant="body1" gutterBottom>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              You Currently don't have any Exams
              </div>
            </Typography>
          ) : (
            examData.map((exam, index) => (
              <Card key={index} className="exam-card">
                <Typography variant="h6" gutterBottom>
                  {exam.title}
                </Typography>
                {exam.isStarted && (
                  <p>exam started</p>
                )}
                <Typography variant="body1" gutterBottom>
                  Exam Duration: {`${exam.timeDuration} minutes`}
                </Typography>
                <div className="button-container">
                <Button
                  variant="contained"
                  color={buttonProps[exam._id].color} // Change color based on exam start status
                  className="start-button"
                  onClick={() => handleStartExam(exam)}
                  disabled={startedExams.includes(exam._id) || buttonProps[exam._id].color === 'error'} // Disable button if exam already started
                  sx={{
                    "&:disabled": {
                      backgroundColor: buttonProps[exam._id].color === 'error' ? "#f44336" : "#e0e0e0", // Override disabled background color to red if color is red, otherwise grey
                      color: buttonProps[exam._id].color === 'error' ? "#fff" : "rgba(0, 0, 0, 0.87)", // Override text color to white if color is red, otherwise default text color
                    },
                  }}
                >
                  {buttonProps[exam._id].text} {/* Change button text based on exam start status */}
                </Button>
                </div>
              </Card>
            ))
          )
         
           }
            <hr className="my-5 " />
        </div>
      )}
      {value === 1 && <StudentResults />}
    </div>
  </Card>

);
  
};
export default UserDashboard;
