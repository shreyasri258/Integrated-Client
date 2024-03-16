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



function Submitted() {
  const history = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    history('/student-dashboard');
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
          Go Back to your dashboard 
          <Button
          classes={"self-start hover:ring-8 ring-indigo-200"}
          type="submit"
          onClick={handleClick}
          ></Button>
        </h1>
      </div>
    </div>
  );
}

export default Submitted;
