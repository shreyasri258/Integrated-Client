import { useState ,useContext} from "react";

import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Icon from "../images/Icon.png";


import { AdminContext } from "../contextCalls/adminContext/AdminContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function UniversalNavbar(){
    const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const { admin } = useContext(AdminContext);
  const [adminDetails, setAdminDetails] = useState({ name: "", email: "" });

    const handleOpenDetails = () => {
        setAdminDetails({ name: admin.admin.name, email: admin.admin.email });
        console.log(adminDetails);
        setOpen(true);
      };
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleCloseDetails = () => {
        setOpen(false);
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

      return(
        
         <>
    <Card>
    <Tabs
      value={value}
      onChange={handleChange}
      className="dashboard-tabs"
      aria-label="tabs example"
      style={{border:"none"}}
    >
      <Tab
        className="dashboard-tab"
        
        icon={
          <a href="/admin-dashboard">
            <img
              src={Icon}
              alt="Logo"
              className="logo-image"
              style={{ maxWidth: "50px", maxHeight: "50px" ,margin:"8px",marginBottom:"2px"}}
             
            />
          </a>
        }
      />
    
   
     
      <Button
        onClick={handleOpenDetails}
        variant="contained"
        color="primary"
        className="details-button"
        sx={{
          position: "absolute",
          top: 10,
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

    

   
  </Card>
  
  </>
      )


    }
    export default UniversalNavbar;