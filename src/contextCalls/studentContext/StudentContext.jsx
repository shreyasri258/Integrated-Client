import StudentReducer from "./StudentReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const StudentContext = createContext(INITIAL_STATE);

export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StudentReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <StudentContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};