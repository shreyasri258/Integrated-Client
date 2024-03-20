import { configureStore } from "@reduxjs/toolkit";
import newFormReducer from "../store/slices/newForm";
import ansFormReducer from "../store/slices/ansForm";
import submissionsReducer from "../store/slices/viewSubmissions";
import timerReducer from "../store/slices/examTimer"; 

const store = configureStore({
  reducer: {
    newForm: newFormReducer,
    ansForm: ansFormReducer,
    viewSubmissions: submissionsReducer,
    timer: timerReducer, 
  },
});

export default store;
