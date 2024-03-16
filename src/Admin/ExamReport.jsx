
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import { useAuth } from "../store/UserAuth";
import { getForm, sendFormLink ,getStudentData} from "../store/slices/viewSubmissions";
import { useState, useEffect } from "react";
import UniversalNavbar from "./universalNavbar";
import ExamReportCard from "./utils/ExamReportCard";
// Card component for displaying submission information


function ExamReport() {
  const form = useSelector(getForm);
  const { user, authUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const { formId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentData(formId); // Call the API function to fetch data
        setSubmissions(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  // Dummy data for submissions
  // const submissions = [
  //   { name: "John Doe", score: 80, malpractices: 0 },
  //   { name: "Jane Doe", score: 75, malpractices: 1 },
  //   { name: "Alice Smith", score: 90, malpractices: 0 },
  //   { name: "Bob Johnson", score: 85, malpractices: 123 },
  //   { name: "Eve Brown", score: 95, malpractices: 0 },
  //   { name: "Alice Smith", score: 90, malpractices: 0 },
  //   { name: "Bob Johnson", score: 85, malpractices: 2 },
  //   { name: "Eve Brown", score: 95, malpractices: 9 },
  //   { name: "Alice Smith", score: 90, malpractices: 0 },
  //   { name: "Bob Johnson", score: 85, malpractices: 2 },
  //   { name: "Eve Brown", score: 95, malpractices: 0 },
  //   { name: "Alice Smith", score: 90, malpractices: 0 },
  //   { name: "Bob Johnson", score: 85, malpractices: 2 },
  //   { name: "Eve Brown", score: 95, malpractices: 12222222222 },
  //   // Add more submissions as needed
  // ];

  // Divide submissions into groups of 3 for layout
  const groupedSubmissions = [];
  for (let i = 0; i < submissions.length; i += 3) {
    groupedSubmissions.push(submissions.slice(i, i + 3));
  }

  return (
    <>
      <UniversalNavbar />
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl text-blue-700 font-bold text-center tracking-wide mb-6">Exam Report</h1>
        {submissions.length > 0 && groupedSubmissions.map((group, index) => (
          <div key={index} className="grid grid-cols-3 mb-4 gap-4 border-blue-700">
            {group.map((submission, subIndex) => (
              <ExamReportCard
                key={subIndex}
                name={submission.username}
                email={submission.email}
                score={submission.score}
                malpractices={submission.totalMalpractices}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ExamReport;
