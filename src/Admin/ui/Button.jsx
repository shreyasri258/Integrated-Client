import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, type, to, onClick, classes }) {
  if (type === "Link") {
    return (
      <div className="bg-indigo-500 text-white py-2 px-2.5 text-sm rounded-md font-medium transition-all duration-300 ease-in-out hover:bg-indigo-600">
        <Link to={to}>{children}</Link>
      </div>
    );
  }

  if (type === "FormButton") {
    return (
      <button className="bg-indigo-500 text-white py-1.5 px-.5 text-sm rounded-md font-medium transition-all duration-300 ease-in-out hover:bg-indigo-700">
        {children}
      </button>
    );
  }

  if (type === "action" || type === "submit") {
    return (
      <button
        className={`bg-indigo-500 text-white py-2 px-2.5 text-sm rounded-${type === "submit" ? "full" : "md"} font-medium transition-all duration-300 ease-in-out hover:bg-indigo-600 ${classes}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["Link", "FormButton", "action", "submit"]).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  classes: PropTypes.string,
};

export default Button;
