import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
const initialState = {
  isLoading: false,
  triedSubmitting: false,
  isSubmitted:false,
  // isTimeExpired:false,
  answers: [],
};

const BASE_URL = 'http://localhost:8800';//8081

export async function getQuestionForm(formId) {
  const res = await axios
    .get(`${BASE_URL}/exams/questionforms/${formId}`)
    .catch((error) => error.response)
    console.log(res);
  return res;
}

const ansFormSlice = createSlice({
  name: "ansForm",
  initialState,
  reducers: {
    readyAns(state, action) {
      const numOfQuestions = action.payload;
      const answers = [];
      for (let i = 0; i < numOfQuestions; i++) {
        answers.push(undefined);
      }
      state.answers = answers;
    },
    setAns(state, action) {
      const { ansIdx, ans } = action.payload;
      console.log('action in setAns - ',action);
      state.answers[ansIdx] = ans;
      // state.answers = state.answers.map((item, index) => index === ansIdx ? ans : item);

    },
    setTriedSubmitting(state, action) {
      state.triedSubmitting = action.payload;
    },
    setSubmit(state,action){
      state.isSubmitted = action.payload;
    },
    // setTimeExpired(state,action){
    //   console.log('action in setTimeExp - ', action)
    //   state.isTimeExpired = action.payload;
    // },
    resetAnsForm(state, action) {
      return {
        ...initialState,
        answers: state.answers, // Preserve the answers array
      };
    
    },
    // updateAnswer(state, action) {
    //   const { ansIdx, ans } = action.payload;
    //   console.log('state - ',state, 'action - ',action.payload);
    //   return {
    //     ...state,
    //     answers: state.answers.map((item, index) =>
    //       index === ansIdx ? ans : item
    //     ),
    //   };
    // },
    
  },
});

export async function submitForm(answers, formId) {
  const score = 0
  const malpracticeAttempts = 0
  const userLocalStorageString = localStorage.getItem('user');
    const userLocalStorageObject = JSON.parse(userLocalStorageString);
    const token = userLocalStorageObject.token;
    console.log('admin - token - ', token);
  const res = await axios
    .post(`${BASE_URL}/exams/questionforms/${formId}/attempts`, { formId, answers , score , malpracticeAttempts }, {
      headers: {
        'x-auth-token': `${token}`,
      },
    })
    .catch((error) => error.response);
    console.log('form submitted - ', res.data);
  return res;
}

export const { readyAns, setAns,setSubmit, setTimeExpired, setTriedSubmitting, resetAnsForm } =
  ansFormSlice.actions;

export default ansFormSlice.reducer;

export const getAnswers = (state) => {
  console.log('ans in getAns - ', state.ansForm);
  return state.ansForm.answers;
};

export const getAns = (ansIdx) => (state) => state.ansForm.answers[ansIdx];

export const getTriedSubmitting = (state) => {
  return state.ansForm.triedSubmitting;
};
export const getSubmit = (state) => {
  return state.ansForm.isSubmitted;
};
// export const getTimeExpired = (state) => {
//   
//   return state.ansForm.isTimeExpired;
// }