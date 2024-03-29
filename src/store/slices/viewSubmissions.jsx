import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8800';

const initialState = {
  responseIdx: 0,
  questionIdx: 0,
  form: {},
  answers: {},
};

const submissionsSlice = createSlice({
  name: "viewSubmissions",
  initialState,
  reducers: {
    setForm(state, action) {
      const form = action.payload;
      state.form = form;
    },
    setResponseIdx(state, action) {
      state.responseIdx = action.payload;
    },
    setQuestionIdx(state, action) {
      state.questionIdx = action.payload;
    },
  },
});
export async function getStudentData(formId){
  try{
    console.log('exam std data invoked');
    const adminLocalStorageString = localStorage.getItem('admin');
    const adminLocalStorageObject = JSON.parse(adminLocalStorageString);
    const token = adminLocalStorageObject.token;
    console.log('admin - token - ', token); 
    const res = await axios.get(`${`http://localhost:8800/exams/admin/attempts`}/${formId}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  console.log('view-form-data - ',res.data);
  if(res.status == 200){
    return res.data
  } else{
    return "Server issue"
  }
  
  }catch(error){

  }
}
export async function sendFormLink(link, emails, subject, body) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios
      .post(
        `${BASE_URL}/sendEmail`,
        { link, emails, subject, body },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .catch((error) => error.response);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const { setForm, setResponseIdx, setQuestionIdx  } =
  submissionsSlice.actions;

export default submissionsSlice.reducer;

export const getResponseIdx = (state) => state.viewSubmissions.responseIdx;

export const getQuestionIdx = (state) => state.viewSubmissions.questionIdx;

export const getForm = (state) => state.viewSubmissions.form;

// export const getOptionsFreq = (questionIdx) => (state) => {
//   const question = state.viewSubmissions.form.questions[questionIdx];
//   const numOptions = question.options.length;
//   const freq = [];
//   for (let i = 0; i < numOptions; i++) {
//     freq.push(0);
//   }
//   if (question.type === "multiple-choice" || question.type === "dropdown") {
//     state.viewSubmissions.form.ansForms.forEach((ansForm, idx) => {
//       freq[ansForm[questionIdx]] += 1;
//     });
//   }

//   if (question.type === "check-boxes") {
//     state.viewSubmissions.form.ansForms.forEach((ansForm, idx) => {
//       if (ansForm[questionIdx]) {
//         ansForm[questionIdx].forEach((ans, idx) => {
//           freq[ans] += 1;
//         });
//       }
//     });
//   }

//   return freq;
// };
export const getOptionsFreq = (questionIdx) => (state) => {
  const question = state.viewSubmissions.form.questions[questionIdx];
  const numOptions = question.options.length;
  const freq = Array(numOptions).fill(0); // Initialize frequency array

  state.viewSubmissions.form.ansForms.forEach((ansForm) => {
    const answer = ansForm[questionIdx];
    if (Array.isArray(answer)) { // Check if the answer is an array
      answer.forEach((ans) => {
        freq[ans] += 1;
      });
    } else { // Otherwise, treat it as a single value
      freq[answer] += 1;
    }
  });

  return freq;
};
