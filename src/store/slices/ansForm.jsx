import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  triedSubmitting: false,
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
      state.answers[ansIdx] = ans;
    },
    setTriedSubmitting(state, action) {
      state.triedSubmitting = action.payload;
    },
    resetAnsForm(state, action) {
      return initialState;
    },
  },
});

export async function submitForm(answers, formId) {
  const score = 0
  const malpracticeAttempts = 0
  const res = await axios
    .post(`${BASE_URL}/exams/questionforms/${formID}/attempts`, { formId, answers , score , malpracticeAttempts })
    .catch((error) => error.response);
  return res;
}

export const { readyAns, setAns, setTriedSubmitting, resetAnsForm } =
  ansFormSlice.actions;

export default ansFormSlice.reducer;

export const getAnswers = (state) => {
  return state.ansForm.answers;
};

export const getAns = (ansIdx) => (state) => state.ansForm.answers[ansIdx];

export const getTriedSubmitting = (state) => {
  return state.ansForm.triedSubmitting;
};
