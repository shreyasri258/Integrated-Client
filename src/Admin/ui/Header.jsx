import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/UserAuth";
import Button from "./Button";

function Header() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const pathArray = pathname.split("/");
  const currentPage = pathArray[pathArray.length - 1];

  return (
    <nav className="flex justify-between items-center h-12 sticky top-0 w-screen bg-indigo-100 z-50 ">
      <div className="ml-12 flex items-center justify-between w-1/4">
        <div className="text-indigo-500  text-2xl transition-colors duration-300 ease-in-out  ">
          <Link to="/app">
            <span className="font-pacifico indigo_gradient">Formaker</span>
          </Link>
        </div>
        {user.isAuthenticated && (
          <>
            <Link to="/dashboard">
              <span
                className={`flex items-center text-indigo-500 ${
                  currentPage === "dashboard" && "underline underline-offset-8"
                }   justify-center gap-2 text-lg  ml-8 cursor-pointer font-bold  transition-all ease-in-out duration-300 `}
              >
                Dashboard
              </span>
            </Link>

            <Link to="/newForm">
              <span
                className={`flex items-center justify-center gap-2 text-lg whitespace-nowrap ml-8 cursor-pointer text-indigo-500 ${
                  currentPage === "newForm" && "underline underline-offset-8"
                } font-bold transition-all ease-in-out duration-300 `}
              >
                New Form
              </span>
            </Link>
          </>
        )}
      </div>

      <div className="flex justify-between mr-16  gap-4">
        {user.isAuthenticated ? (
          <Button type={"action"} onClick={logout}>
            Log Out
          </Button>
        ) : (
          <>
            <Button type={"Link"} to={"/login"}>
              Log In
            </Button>
            <Button type={"Link"} to={"/signUp"}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
