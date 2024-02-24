import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  id: "",
  name: "",
  isAuthenticated: false,
  questionForms: [],
  ansForms: {},
};

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const UserAuthContext = createContext();

function authUserAction(state, action) {
  const { id, name, token } = action.payload;
  localStorage.setItem("token", token);
  return { ...state, id, name, isAuthenticated: true };
}

function reducer(state, action) {
  switch (action.type) {
    case "signUp":
      return authUserAction(state, action);
    case "login":
      return authUserAction(state, action);
    case "authUser":
      return authUserAction(state, action);
    case "logout":
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(reducer, initialState);

  async function signUp(name, email, password) {
    try {
      const res = await axios
        .post(`${BASE_URL}/signup`, { name, email, password })
        .catch((error) => {
          return error.response;
        });

      if (res.status === 200) {
        const { name, id, token } = res.data.user;
        dispatch({ type: "signUp", payload: { name, id, token } });
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email, password) {
    try {
      const res = await axios
        .post(`${BASE_URL}/login`, { email, password })
        .catch((error) => {
          return error.response;
        });

      if (res.status === 200) {
        const { name, id, token } = res.data.user;
        console.log(token);
        dispatch({ type: "login", payload: { name, id, token } });
        return res;
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function authUser() {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      const res = await axios
        .post(`${BASE_URL}/authUser`, null, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .catch((error) => error.response);

      if (res.status === 200) {
        const { id, name } = res.data.user;
        dispatch({ type: "authUser", payload: { name, id, token } });
      } else if (res.status === 401) {
        console.log("token expired");
        dispatch({ type: "logout" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/logout`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (res.status === 200) dispatch({ type: "logout" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserAuthContext.Provider value={{ user, signUp, login, authUser, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(UserAuthContext);
  if (context === undefined)
    throw new Error("UserAuthContext was used outside AuthProvider scope");

  return context;
}

export { AuthProvider, useAuth };
