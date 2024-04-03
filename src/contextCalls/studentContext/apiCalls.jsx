import axios from "axios";
import { toast } from 'react-toastify';
import { loginFailure, loginStart, loginSuccess, userLogout } from "./StudentActions";

export const login = async (user, dispatch,navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/Server/user/login",
      user
    );
    dispatch(loginSuccess(res.data));
   
    navigate("/student-dashboard");
  } catch (err) {
    
      if(err.status === 400){
        toast.error("Invalid Credentials!");
      }
      else
      {
        toast.error("Server Error,Please try again later")
      }
      console.log("Error Context" + err.message);
    dispatch(loginFailure());
  }
};

export const logout = (dispatch, navigate) => {
  localStorage.removeItem("user"); 
  dispatch(userLogout()); 
  navigate("/"); 
};

