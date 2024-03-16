// import { Link } from "react-router-dom";

// function Submitted() {
//   return (
//     <div>
//       <div className="flex justify-center items-center p-6">
//         <span className="ml-12 text-blue-500 text-3xl transition-colors duration-300 ease-in-out ">
//           <Link to="/app">
//             <span className="font-pacifico indigo_gradient">ProctorPal</span>
//           </Link>
//         </span>
//       </div>

//       <div className="flex h-screen justify-center items-center">
//         <h1 className="text-xl text-blue-500 font-bold pb-16">
//           You have successfully submitted the form!
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default Submitted;
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import {
  getAnswers,
  getQuestionForm,
  getTriedSubmitting,
  readyAns,
  setTriedSubmitting,
  getSubmit,
  setSubmit,
  submitForm,
  // updateAnswer,
} from "../store/slices/ansForm";
import { useDispatch, useSelector } from "react-redux";



function Submitted() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isSubmitted = useSelector(getSubmit);

  const handleClick = () => {

    // Open the student-dashboard URL in a new tab
    // const newWindow = window.open('/student-dashboard', '_blank');
    if(isSubmitted){
      window.close();
    }
  
    // Display a SweetAlert confirmation dialog to close the current window manually
    // if (newWindow) {
    //   newWindow.focus(); // Ensure the new window is focused
    //   Swal.fire({
    //     title: 'Close Window',
    //     text: 'Please close this window manually after confirming the action.',
    //     icon: 'info',
    //     confirmButtonText: 'OK',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.close(); // Close the current window
    //     }
    //   });
    //}
  };
  
  return (
    <div>
      <div className="flex justify-center items-center p-6">
        <span className="ml-12 text-blue-500 text-3xl transition-colors duration-300 ease-in-out ">
          <Link to="/app">
            <span className="font-pacifico indigo_gradient">ProctorPal</span>
          </Link>
        </span>
      </div>

      <div className="flex h-screen justify-center items-center">
        <h1 className="text-xl text-blue-500 font-bold pb-16">
          You have successfully submitted the form!
          <Button
          classes={"self-start hover:ring-8 ring-indigo-200 text-lg py-2 px-4"}
          type="submit"
          onClick={() => handleClick()}
        >
          Go Back To Dashboard
        </Button>
        </h1>
      </div>
    </div>
  );
}

export default Submitted;
