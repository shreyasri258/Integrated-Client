import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./StudentActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/Server/user/login",
      user
    );
    console.log("success" + JSON.stringify(res.data));
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log("Error Context" + err.message);
    dispatch(loginFailure());
  }
};
