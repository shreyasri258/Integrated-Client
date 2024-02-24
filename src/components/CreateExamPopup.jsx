import React, { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

const CreateExamPopup = ({ onSubmit, onClose }) => {
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newGoogleFormLink, setNewGoogleFormLink] = useState("");
  const [newExamDuration, setNewExamDuration] = useState("");

  useEffect(() => {
    // Retrieve data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem("examData")) || {};
    setNewExamTitle(storedData.examTitle || "");
    setNewGoogleFormLink(storedData.googleFormLink || "");
    setNewExamDuration(storedData.examDuration || "");
  }, []);

  const handleSubmit = () => {
    // Pass the entered details to the onSubmit function
    const newExam = {
      examTitle: newExamTitle,
      googleFormLink: newGoogleFormLink,
      examDuration: newExamDuration,
    };

    // Store data in local storage
    localStorage.setItem("examData", JSON.stringify(newExam));

    onSubmit(newExam);
  };

  return (
    <Popover
      open={true} // Assuming this component is always open when called
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 4 }}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Fill Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Exam Title
        </Typography>
        <TextField
          fullWidth
          id="exam-title"
          value={newExamTitle}
          onChange={(e) => setNewExamTitle(e.target.value)}
        />
        <Typography variant="body1" gutterBottom>
          Google Form Link
        </Typography>
        <TextField
          fullWidth
          id="google-form-link"
          value={newGoogleFormLink}
          onChange={(e) => setNewGoogleFormLink(e.target.value)}
        />
        <Typography variant="body1" gutterBottom>
          Exam Duration (in minutes)
        </Typography>
        <TextField
          fullWidth
          id="exam-duration"
          type="number"
          value={newExamDuration}
          onChange={(e) => setNewExamDuration(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Create Exam
        </Button>
      </Box>
    </Popover>
  );
};

export default CreateExamPopup;
