import { useEffect, useState, useContext } from "react";
import { useAuth } from "../store/UserAuth";
import { getFormsList } from "../store/slices/newForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [showModal, setShowModal] = useState(false);
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
  //To set sample Data for testing purposes
  const [sampleForm, setSampleForm] = useState({
    title: "Sample Form",
    created: new Date().toISOString(),
    questions: [],
    ansForms: [],
    accepting: true,
    duration:"23",
  });

  const [sampleFormAdded, setSampleFormAdded] = useState(false);

useEffect(() => {
  if (!sampleFormAdded) {
    setFormsList([sampleForm, ...formsList]); // Add the sample form to the beginning of the formsList
    setDisplayForms([sampleForm, ...formsList]); // Update the displayForms as well
    setSampleFormAdded(true);
  }
}, []);

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
        toast.success("Admin registered successfully", { position: "top-right" });
        setShowModal(true);
      } else {
        console.error("Failed to mark exam as posted.");
        setExamData(examData);
      }
    } catch (error) {
      console.error("Error marking exam as posted:", error);
      setExamData(examData);
    }
  };

   const handleMakeForm = () => {
    navigate("/create-form");
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
     <>
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
                  style={{ maxWidth: "50px", maxHeight: "50px" ,margin:"10px"}}
                 
                />
              </a>
            }
          />
        
          <Tab
            className="dashboard-tab "
            label="Create Exam"
            onClick={handleMakeForm}
          />
          <div className="search-wrapper-navbar" style={{ width: "60%" }}>
            <div   className="search-input-wrapper">
              {/* <span className="search-icon">
                <AiOutlineSearch />
              </span> */}
              <input
                
                className="search-input w-full"
                
                placeholder="Search Exam By Title..."
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
              top: 10,
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

  

      <div className="flex min-h-screen justify-center items-center">
        <h3 className="mb-32 text-lg text-blue-600">
          Hi, you currently don't have any forms.
        </h3>
      </div>
      </>
    );
  }
  
 

  return (
    <>
    <ToastContainer></ToastContainer>
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
                  style={{ maxWidth: "50px", maxHeight: "50px" ,margin:"10px"}}
                 
                />
              </a>
            }
          />
        
          <Tab
            className="dashboard-tab "
            label="Create Exam"
            onClick={handleMakeForm}
          />
          <div className="search-wrapper-navbar" style={{ width: "60%" }}>
            <div   className="search-input-wrapper">
              {/* <span className="search-icon">
                <AiOutlineSearch />
              </span> */}
              <input
                
                className="search-input w-full"
                
                placeholder="Search Exam By Title..."
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
              top: 10,
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

        

       
      </Card>

      <div className="search-wrapper">
        <div className="search-input-wrapper">
          
        </div> 
        {displayForms.length === 0 ? (
       <div className="flex justify-center items-center h-screen">
       <div className="no-results">
         <p className="no-results-text" >No Exam With Such Title </p>
       </div>
     </div>
     
        
        ) : (

          <div 
          className="forms-table" 
          style={{ marginTop: "10%" }}>
             <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'blue', scrollbarTrackRounded: 'full' }}>
     
                  <FormsTable
              displayForms={displayForms}
              setDisplayForms={setDisplayForms}
            />
          </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
