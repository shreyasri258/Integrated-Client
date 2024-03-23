import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentResults = () => {
  // Sample results data
  const sampleResultsData = [
    { examTitle: "Math Exam", results: 37, numMalfunctions: 0 },
    { examTitle: "Science Exam", results: 47, numMalfunctions: 2 },
    { examTitle: "History Exam", results: 70, numMalfunctions: 1 },
  ];

  const navigate = useNavigate();

  const handleViewDetail = (examTitle) => {
    // Navigate to ViewResults page with examTitle as a query parameter
    navigate(`/view-results?examTitle=${encodeURIComponent(examTitle)}`);
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
                Results: {result.results}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Number of Malfunctions: {result.numMalfunctions}
              </Typography>
              <Button onClick={() => handleViewDetail(result.examTitle)} variant="outlined">
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
