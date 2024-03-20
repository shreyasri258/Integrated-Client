import axios from "axios";
import { toast } from 'react-toastify';
import { adminLoginFailure, adminLoginStart, adminLoginSuccess } from "./AdminActions";

export const login = async (user, dispatch, navigate) => {
  dispatch(adminLoginStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/Server/admin/login",
      user
    );
    dispatch(adminLoginSuccess(res.data));
    navigate("/admin-dashboard");
  } catch (err) {
    if(err.response.status === 400){
      toast.error("Invalid Credentials!");
    }
    else
    {
      toast.error("Server Error,Please try again later")
    }
    console.log("Error Context" + err.message);
    dispatch(adminLoginFailure());
  }
};
