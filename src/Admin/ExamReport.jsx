import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/UserAuth";
import { getForm, sendFormLink, getStudentData } from "../store/slices/viewSubmissions";
import { useState, useEffect } from "react";
import UniversalNavbar from "./universalNavbar";
import ExamReportCard from "./utils/ExamReportCard";

function ExamReport() {
  const form = useSelector(getForm);
  const { user, authUser } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const { formId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentData(formId);
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const groupedSubmissions = [];
  for (let i = 0; i < submissions.length; i += 3) {
    groupedSubmissions.push(submissions.slice(i, i + 3));
  }

  return (
    <>
      <UniversalNavbar />
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl text-blue-700 font-bold text-center tracking-wide mb-6">Exam Report</h1>
        {submissions.length === 0 ? (
          <div className="flex justify-center mt-48 text-blue-700 items-center h-full">
          <p className="text-xl text-blue-500">No Submissions yet</p>
        </div>
        ) : (
          groupedSubmissions.map((group, index) => (
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
          ))
        )}
      </div>
    </>
  );
}

export default ExamReport;
