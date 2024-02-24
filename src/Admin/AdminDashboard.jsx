import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "../components/CreateExamPopup";
import { Link } from "react-router-dom";
import Icon from '../images/Icon.png';
import axios from 'axios';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../css/userDashboard.css'; 
import { AdminContext } from "../contextCalls/adminContext/AdminContext"; // Import 


const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState([]);
  const [open, setOpen] = useState(false);
  const {admin} = useContext(AdminContext);
const [adminDetails, setAdminDetails] = useState({ name: '', email: '' });
  console.log(JSON.stringify(admin));
const handleOpenDetails = () => {
  // Set the admin details here. This is just an example.
  setAdminDetails({ name: admin.admin.name , email: admin.admin.email });
  console.log(adminDetails);
  setOpen(true);
};

const handleCloseDetails = () => {
  setOpen(false);
};
  // Retrieve exam data from local storage on component mount
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("examData")) || [];
  //   setExamData(storedData);
  // }, []);
  useEffect(() => {
    fetchExamData();
  }, []);

  // Function to fetch exam data from the server
  const fetchExamData = async () => {
    try {
      // Retrieve the admin's authentication token from local storage
      const adminData = localStorage.getItem('admin');
    const  token = JSON.parse(adminData).token;
      if (!token) {
        // Handle case where token is not available
        console.error('No token available');
        return;
      }
      // Send a GET request to fetch exam data from the server
      const response = await axios.get('http://localhost:8800/exams/admin/exams', {
        headers: {
          'x-auth-token': token // Include the admin's authentication token in the request header
        }
      });
      // Update the exam data state with the data fetched from the server
      console.log('sucessfull fetch -> ', response.data);
      
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
  };
  


  const handleCreateExamClick = () => {
    setShowCreateExamPopup(true);
  };

  const handleCloseCreateExamPopup = () => {
    setShowCreateExamPopup(false);
  };

  // const handleSubmitCreateExam = (newExam) => {
  //   // Update exam data state
  //   setExamData([...examData, newExam]);
  //   // Update local storage with new exam data
  //   localStorage.setItem("examData", JSON.stringify([...examData, newExam]));
  //   handleCloseCreateExamPopup();
  // };


  const handleSubmitCreateExam = async (newExam) => {
    try {
      // Retrieve the admin's authentication token from local storage
      const adminDataString = localStorage.getItem('admin');
      
      if (!adminDataString) {
        // Handle case where token is not available
        console.error('No token available');
        return;
      }
  
      // Parse the JSON string to get the admin data object
      const adminData = JSON.parse(adminDataString);
      
      // Extract the token from the admin data object
      const token = adminData.token;
      console.log(newExam);
      // Send a POST request to the server to create a new exam
      const response = await axios.post('http://localhost:8800/exams/admin/exams', {
        title: newExam.examTitle,
        timeDuration: newExam.examDuration,
        googleFormLink: newExam.googleFormLink,
        postedForStudents : false,
        admin : admin.admin,
      }, {
        headers: {
          'x-auth-token': token // Include the admin's authentication token in the request header
        }
      });
      
      // Fetch updated exam data from the server
      const responseDataArray = Array.isArray(response.data) ? response.data : [response.data];
      console.log('post response - ', responseDataArray);
      setExamData([...examData, ...responseDataArray]);
      
      console.log('Exam created successfully');
    } catch (error) {
      console.error('Error creating exam:', error);
    }
    
    handleCloseCreateExamPopup();
  };
  

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteExam = (index) => {
    // Remove exam at specified index from the exam data state
    const updatedExamData = [...examData];
    updatedExamData.splice(index, 1);
    setExamData(updatedExamData);
    // Update local storage with updated exam data
    localStorage.setItem("examData", JSON.stringify(updatedExamData));
  };

  // const handlePostExam = (index) => {
  //   // Mark the exam as posted
  //   const updatedExamData = [...examData];
  //   updatedExamData[index].posted = true;
  //   setExamData(updatedExamData);
  //   // Update local storage with updated exam data
  //   localStorage.setItem("examData", JSON.stringify(updatedExamData));

  //   // Add the posted exam to the shared location
  //   const postedExam = updatedExamData[index];
  //   const postedExams = JSON.parse(localStorage.getItem("postedExams")) || [];
  //   localStorage.setItem(
  //     "postedExams",
  //     JSON.stringify([...postedExams, postedExam])
  //   );
  // };


const handlePostExam = async (index) => {
  try {
    const updatedExamData = [...examData];
    updatedExamData[index].postedForStudents = true;
    setExamData(updatedExamData);

    // Prepare the data to be sent in the request body
    const requestData = {
      title: updatedExamData[index].title,
      timeDuration: updatedExamData[index].timeDuration,
      googleFormLink: updatedExamData[index].googleFormLink,
      postedForStudents: true, // Assuming this is the attribute that indicates if the exam is posted for students
      admin : admin.admin,
    };
    const adminDataString = localStorage.getItem('admin');
      
      if (!adminDataString) {
        // Handle case where token is not available
        console.error('No token available');
        return;
      }
  
      // Parse the JSON string to get the admin data object
      const adminData = JSON.parse(adminDataString);
      
      // Extract the token from the admin data object
      const token = adminData.token;
      console.log('put-token ',token)
    // Send the PUT request to update the exam on the server
    const response = await axios.put(
      `http://localhost:8800/exams/admin/exams/${updatedExamData[index]._id}`,
      requestData,
      {
        headers: {
          'x-auth-token': token // Include the admin's authentication token in the request header
        }
      }
    );

    // Check if the request was successful
    if (response.status === 200) {
      console.log('Exam successfully marked as posted.');
    } else {
      console.error('Failed to mark exam as posted.');
      // Revert the local state changes if the request was not successful
      setExamData(examData);
    }
  } catch (error) {
    console.error('Error marking exam as posted:', error);
    // Revert the local state changes if an error occurred
    setExamData(examData);
  }
};

// const handleRemoveExam = (index) => {
//   const updatedExamData = [...examData];
//   updatedExamData.splice(index, 1);
//   setExamData(updatedExamData);
//   localStorage.setItem("examData", JSON.stringify(updatedExamData));

//   // Remove the exam from the shared location
//   const postedExams = JSON.parse(localStorage.getItem("postedExams")) || [];
//   const filteredPostedExams = postedExams.filter((_, i) => i !== index);
//   localStorage.setItem("postedExams", JSON.stringify(filteredPostedExams));
// };
const handleRemoveExam = async (index) => {
  try {
    const adminDataString = localStorage.getItem('admin');
      if (!adminDataString) {
        // Handle case where token is not available
        console.error('No token available');
        return;
      }
      // Parse the JSON string to get the admin data object
      const adminData = JSON.parse(adminDataString);
      // Extract the token from the admin data object
      const token = adminData.token;
    console.log('examdata-> ',examData[index]);
    await axios.delete(`http://localhost:8800/exams/admin/exams/${examData[index]._id}`, {
      headers: {
        'x-auth-token': token  // Include the admin's authentication token in the request header
      }
    });
    // Update the exam data state to remove the deleted exam
    const updatedExamData = [...examData];
    updatedExamData.splice(index, 1);
    setExamData(updatedExamData);
  } catch (error) {
    console.error('Error removing exam:', error);
    // Handle error, if needed
  }
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
  console.log('the exams are ', examData);

  return (
    
    <Card>
        
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          height: "auto",
          position: "fixed",
          top: 5,
          left: 0,
          right: 0,
          marginLeft:3,
          marginRight:3,
          border: "0.29px solid black",
          borderStyle:"dotted",
          borderRadius:3

        
        }}
        aria-label="tabs example"
      >
        <a href="/admin-dashboard">
  <img src={Icon} alt="Logo" className="logo-image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
</a>
        <Tab
          sx={{
            mx: 12,
            display: "flex",
            justifyContent: "center",
          }}
          label="Create Exam"
          onClick={handleCreateExamClick}
        />
        {/* Add other tabs as needed */}
        <Button onClick={handleOpenDetails}
          variant="contained"
          color="primary"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            margin: 1, // Adjust margin as needed
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

      <div
        style={{
          position: "fixed",
          top: "calc(5rem + 10px)",
          left: 0,
          right: 0,
          overflowY: "auto",
          height: "calc(100% - 5rem - 10px)",
        }}
      >
        {examData.map((exam, index) => (
          <Card key={index} sx={{ padding: 2, marginTop: 2,marginLeft:4,marginRight:4 , position: "relative" }}>
            <Typography variant="h6" gutterBottom>
              {exam.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Google Form Link: {exam.googleFormLink}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Exam Duration: {exam.timeDuration} minutes
            </Typography>
            <div style={{ marginLeft: "auto", display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
              {exam.postedForStudents ? (
                <Button variant="contained" color="error" style={{ marginBottom: 8 }} onClick={() => handleRemoveExam(index)}>
                  Remove
                </Button>
              ) : (
                <Button variant="contained" color="success" style={{ marginBottom: 8 }} onClick={() => handlePostExam(index)}>
                  Post
                </Button>
              )}
            </div>
            
          </Card>
        ))}
      </div>

      {showCreateExamPopup && (
        <CreateExamPopup
          onSubmit={handleSubmitCreateExam}
          onClose={handleCloseCreateExamPopup}
        />
      )}
    </Card>
  );
};

export default AdminDashboard;
