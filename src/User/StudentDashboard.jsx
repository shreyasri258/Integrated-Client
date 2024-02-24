import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Icon from '../images/Icon.png';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StudentResults from "./StudentResults"; // Import the ResultsTab component
import '../css/userDashboard.css'; // Import the stylesheet
import {StudentContext} from '../contextCalls/studentContext/StudentContext'

const UserDashboard = () => {
  const [value, setValue] = useState(0);
  const [examData, setExamData] = useState([]);
  const [open, setOpen] = useState(false);
  const {user} = useContext(StudentContext);
  const [adminDetails, setAdminDetails] = useState({ name: '', email: '' });

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
      const {token}  = userDetails
      console.log(token)
      if (!token) {
        console.error('No token available');
        return;
      }
      const response = await axios.get('http://localhost:8800/exams/exams', {
        headers: {
          'x-auth-token': token, // Include the token in header
        },
        query: {
          'institution': institution // institution name as  query params
        }
      });
      console.log(response.data)
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exam data:', error.message);
    }
  };

  useEffect(() => {
    fetchExamData();

  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartExam = (exam) => {
    window.location.href = `/instructions?title=${encodeURIComponent(exam.title)}&duration=${encodeURIComponent(exam.timeDuration)}&url=${encodeURIComponent(exam.googleFormLink)}`;
    //window.Location.href = `/systemcheck?title=${encodeURIComponent(exam.examTitle)}`

  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:  400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow:  24,
    p:  4,
  };

  return (
    <Card>
    
        
      
      <Tabs
        value={value}
        onChange={handleChange}
        className="dashboard-tabs"
        aria-label="tabs example"
      >
        
         <Tab
  className="dashboard-tab"
  icon={
    <img
      src={Icon}
      alt="Available Exams"
      style={{ maxWidth: '50px', maxHeight: '50px' }}
    />
  }
/>
<Tab className="dashboard-tab" label="Available Exams" />
        <Tab className="dashboard-tab" label="Results" />
        <Button
          onClick={handleOpenDetails}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 1,
            borderRadius: "15px",
            boxShadow: '0  4px  8px rgba(0,  0,  0,  0.2)'
          }}
        >
          Details
        </Button>
        <Modal
          open={open}
          onClose={handleCloseDetails}
          aria-labelledby="admin-details-modal"
          aria-describedby="admin-details-description"
        >
          <Box sx={style}>
            <Typography id="admin-details-modal" variant="h6" component="h2">
              Admin Details
            </Typography>
            <Typography id="admin-details-description" sx={{ mt:  2 }}>
              Name: {adminDetails.name} <br />
              Email: {adminDetails.email}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              sx={{
                position: 'absolute',
                right:  8,
                top:  8,
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
            {examData.map((exam, index) => (
              <Card key={index} className="exam-card">
                <Typography variant="h6" gutterBottom>
                  {exam.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Exam Duration: {`${exam.timeDuration} minutes`}
                </Typography>
                <div className="button-container">
                  <Button variant="contained" color="primary" className="start-button" onClick={() => handleStartExam(exam)}>
                    Start Test
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
         {value === 1 && (
          <div>
            {examData.map((exam, index) => (
              <Card key={index} className="exam-card">
                <Typography variant="h6" gutterBottom>
                  {exam.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Exam Duration: {`${exam.timeDuration} minutes`}
                </Typography>
                <div className="button-container">
                  <Button variant="contained" color="primary" className="start-button" onClick={() => handleStartExam(exam)}>
                    Start Test
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        {value === 2 && <StudentResults />}
      </div>
    </Card>
  );
};

export default UserDashboard;