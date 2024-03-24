import React, { useState, useEffect , useContext} from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { StudentContext } from "../contextCalls/studentContext/StudentContext";

const StudentResults = () => {
  const { user } = useContext(StudentContext);
  const BASE_URL = `http://localhost:8800`; // Corrected BASE_URL format
  const [sampleResultsData, setSampleResultsData] = useState([]); // State to hold results data

  useEffect(() => {
    // Function to fetch results data from the API
    async function fetchResultsData() {
      try {
        const userDetails = user;
      const { institution ,id } = userDetails.user.user;
      const { token } = userDetails;
     
      console.log(token);
      if (!token) {
        console.error("No token available");
        return;
      }
      const res = await axios.get(`http://localhost:8800/exams/questionforms/${id}/attempts`, {
        headers: {
          "x-auth-token": token, // Include the token in header
        },
      });
     
      console.log('res got - ',res.data)
        setSampleResultsData(res.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching results data:", error);
      }
    }

    fetchResultsData(); // Call the fetchResultsData function when component mounts
  }, []); // Empty dependency array to ensure this effect runs only once after initial render

  const navigate = useNavigate();

  const handleViewDetail = (questionFormId,attemptId) => {
    console.log('view detail clicked , ',questionFormId,attemptId);
    navigate(`/view-results?formId=${encodeURIComponent(questionFormId)}&attemptId=${encodeURIComponent(attemptId)}`);
  };

  return (
    <div>
      {sampleResultsData.map((result, index) => (
        <div key={index} style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {result.examTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                timeDuration: {result.time}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Score :  {result.score}
              </Typography>
              <Button onClick={() => handleViewDetail(result.questionFormId,result.attemptId)} variant="outlined">
                View in Detail
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default StudentResults;
