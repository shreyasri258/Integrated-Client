import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StudentResults = () => {
  // Sample results data
  const sampleResultsData = [
    { examTitle: "Math Exam", results: 37, numMalfunctions: 0 },
    { examTitle: "Science Exam", results: 47, numMalfunctions: 2 },
    { examTitle: "History Exam", results: 70, numMalfunctions: 1 },
  ];

  return (
    <div>
      {sampleResultsData.map((result, index) => (
        <div key={index} style={{  marginLeft:"20px",marginRight:"20px",marginTop:"20px" }}>
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
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default StudentResults;
