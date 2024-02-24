import axios from "axios";
import {
  adminLoginFailure,
  adminLoginStart,
  adminLoginSuccess,
} from "./AdminActions";

export const login = async (user, dispatch) => {
  dispatch(adminLoginStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/Server/admin/login",
      user
    );
    dispatch(adminLoginSuccess(res.data));
  } catch (err) {
    dispatch(adminLoginFailure());
  }
};
