import { useEffect, useState, useContext } from "react";
import { useAuth } from "../store/UserAuth";
import { getFormsList } from "../store/slices/newForm";

import LoadingSpinner from "../Admin/LoadingSpinner";
import { AiOutlineSearch } from "react-icons/ai";
import AdminDashboard from "./AdminDashboard";
import FormsTable from "../Admin/component/FormsTable";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateExamPopup from "../components/CreateExamPopup";
import { Link } from "react-router-dom";
import Icon from "../images/Icon.png";
import axios from "axios";
import { AdminContext } from "../contextCalls/adminContext/AdminContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import '../css/userDashboard.css';
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../contextCalls/adminContext/AdminContext"; // Import 

function Home() {
  // const { user } = useAuth();
  
  const [formsList, setFormsList] = useState([]);
  const [displayForms, setDisplayForms] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [showCreateExamPopup, setShowCreateExamPopup] = useState(false);
  const [examData, setExamData] = useState([]);
  const [open, setOpen] = useState(false);
  const { admin } = useContext(AdminContext);
  const [adminDetails, setAdminDetails] = useState({ name: "", email: "" });
  const navigate = useNavigate(); 

  console.log(JSON.stringify(admin));
  const handleOpenDetails = () => {
    setAdminDetails({ name: admin.admin.name, email: admin.admin.email });
    console.log(adminDetails);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   fetchExamData();
  // }, []);

  // const fetchExamData = async () => {
  //   try {
  //     const adminData = localStorage.getItem("admin");
  //     const token = JSON.parse(adminData).token;

  //     if (!token) {
  //       console.error("No token available");
  //       return;
  //     }

  //     const response = await axios.get(
  //       "http://localhost:8800/exams/admin/exams",
  //       {
  //         headers: {
  //           "x-auth-token": token,
  //         },
  //       }
  //     );

  //     console.log("successful fetch -> ", response.data);
  //     setExamData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching exam data:", error);
  //   }
  // };

  const handleCreateExamClick = () => {
    setShowCreateExamPopup(true);
  };

  const handleCloseCreateExamPopup = () => {
    setShowCreateExamPopup(false);
  };

  const handleSubmitCreateExam = async (newExam) => {
    try {
      const adminDataString = localStorage.getItem("admin");

      if (!adminDataString) {
        console.error("No token available");
        return;
      }

      const adminData = JSON.parse(adminDataString);
      const token = adminData.token;

      const response = await axios.post(
        "http://localhost:8800/exams/admin/exams",
        {
          title: newExam.examTitle,
          timeDuration: newExam.examDuration,
          googleFormLink: newExam.googleFormLink,
          postedForStudents: false,
          admin: admin.admin,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const responseDataArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      console.log("post response - ", responseDataArray);
      setExamData([...examData, ...responseDataArray]);

      console.log("Exam created successfully");
    } catch (error) {
      console.error("Error creating exam:", error);
    }

    handleCloseCreateExamPopup();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleDeleteExam = (index) => {
  //   const updatedExamData = [...examData];
  //   updatedExamData.splice(index, 1);
  //   setExamData(updatedExamData);
  // };

  const handlePostExam = async (index) => {
    try {
      const updatedExamData = [...examData];
      updatedExamData[index].postedForStudents = true;
      setExamData(updatedExamData);

      const requestData = {
        title: updatedExamData[index].title,
        timeDuration: updatedExamData[index].timeDuration,
        googleFormLink: updatedExamData[index].googleFormLink,
        postedForStudents: true,
        admin: admin.admin,
      };

      const adminDataString = localStorage.getItem("admin");

      if (!adminDataString) {
        console.error("No token available");
        return;
      }

      const adminData = JSON.parse(adminDataString);
      const token = adminData.token;

      const response = await axios.put(
        `http://localhost:8800/exams/admin/exams/${updatedExamData[index]._id}`,
        requestData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Exam successfully marked as posted.");
      } else {
        console.error("Failed to mark exam as posted.");
        setExamData(examData);
      }
    } catch (error) {
      console.error("Error marking exam as posted:", error);
      setExamData(examData);
    }
  };

  const handleRemoveExam = async (index) => {
    try {
      const adminDataString = localStorage.getItem("admin");

      if (!adminDataString) {
        console.error("No token available");
        return;
      }

      const adminData = JSON.parse(adminDataString);
      const token = adminData.token;

      console.log("examdata-> ", examData[index]);
      await axios.delete(
        `http://localhost:8800/exams/admin/exams/${examData[index]._id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const updatedExamData = [...examData];
      updatedExamData.splice(index, 1);
      setExamData(updatedExamData);
    } catch (error) {
      console.error("Error removing exam:", error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  console.log("the exams are ", examData);

  
  useEffect(function () {
    async function setForms() {
      setIsLoading(true);
      const temp = await getFormsList();
      console.log(temp);
      if (Array.isArray(temp)) {
        const forms = temp.reverse();
        console.log('forms in Dashboard - ', forms)
        setFormsList(forms);
        setDisplayForms(forms);

      } else {
        console.error("getFormsList() did not return an array:", temp);
      }
      setIsLoading(false);
    }
    setForms();
  }, []);

  useEffect(() => {
    const newDisplayList = formsList.filter((form, idx) =>
      form.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayForms(newDisplayList);
  }, [search, formsList]);

  if (isLoading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  if (formsList.length === 0) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <h3 className="mb-32 text-lg text-indigo-600">
          Hi, you currently don't have any forms.
        </h3>
      </div>
    );
  }
  
  const handleMakeForm = () => {
    navigate("/create-form");
  };

  return (
    <>
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
              <a href="/admin-dashboard">
                <img
                  src={Icon}
                  alt="Logo"
                  className="logo-image"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              </a>
            }
          />
          <Tab
            className="dashboard-tab"
            label="Create Exam"
            onClick={handleCreateExamClick}
          />
          <Tab
            className="dashboard-tab"
            label="Make Form"
            onClick={handleMakeForm}
          />
          <div className="search-wrapper-navbar">
            <div className="search-input-wrapper">
              {/* <span className="search-icon">
                <AiOutlineSearch />
              </span> */}
              <input
                className="search-input"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <InputAdornment className="search-icon" position="start">
                <AiOutlineSearch />
              </InputAdornment>
               
              {/* <span className="search-icon">
                <AiOutlineSearch />
              </span> */}
            </div>
          </div>
          <Button
            onClick={handleOpenDetails}
            variant="contained"
            color="primary"
            className="details-button"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: 1,
              borderRadius: "15px",
              boxShadow: "0  4px  8px rgba(0,  0,  0,  0.2)",
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
              <Typography
                id="admin-details-description"
                className="admin-details"
              >
                Name: {adminDetails.name} <br />
                Email: {adminDetails.email}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleCloseDetails}
                className="close-button"
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

        <div className="cards-wrapper">
          {examData.map((exam, index) => (
            <Card key={index} className="card-item">
              <Typography variant="h6" gutterBottom>
                {exam.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Google Form Link: {exam.googleFormLink}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Exam Duration: {exam.timeDuration} minutes
              </Typography>
              <div className="button-wrapper">
                {exam.postedForStudents ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveExam(index)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePostExam(index)}
                  >
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

      <div className="search-wrapper">
        <div className="search-input-wrapper">
          
        </div> 
        {displayForms.length === 0 ? (
          <div className="no-results">
            <p className="no-results-text">No forms whose title contains</p>
          </div>
        ) : (
          <div c
          lassName="forms-table" 
          style={{ marginTop: "16%" }}>
            <FormsTable
              displayForms={displayForms}
              setDisplayForms={setDisplayForms}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
