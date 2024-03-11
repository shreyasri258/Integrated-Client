import { Link } from "react-router-dom";

function Submitted() {
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
        </h1>
      </div>
    </div>
  );
}

export default Submitted;
