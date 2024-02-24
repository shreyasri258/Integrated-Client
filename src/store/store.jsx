import { configureStore } from "@reduxjs/toolkit";
import newFormReducer from "../store/slices/newForm";
import ansFormReducer from "../store/slices/ansForm";
import submissionsReducer from "../store/slices/viewSubmissions";

const store = configureStore({
  reducer: {
    newForm: newFormReducer,
    ansForm: ansFormReducer,
    viewSubmissions: submissionsReducer,
  },
});

export default store;
