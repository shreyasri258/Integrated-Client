import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//import { useAuth } from "../../store/UserAuth";
import { AdminContext } from "../../contextCalls/adminContext/AdminContext";
import { useContext } from "react";


const initialQuestion = {
  question: "",
  type: "",
  activeOptionIdx: null,
  options: [],
  required: false,
};

const initialState = {
  id: null,
  title: "",
  description: "",
  timeDuration : "",
  active: { title: true, description: false, questionIdx: null ,timeDuration:null},
  questions: [initialQuestion],
};

const newFormSlice = createSlice({
  name: "newForm",
  initialState,
  reducers: {
    activateTitle(state, action) {
      state.active = { title: true, description: false, questionIdx: null ,timeDuration : null};
    },
    activateDescription(state, action) {
      state.active = { title: false, description: true, questionIdx: null ,timeDuration:null};
    },
    activateTime(state, action) {
      state.active = { title: false, description: true, questionIdx: null ,timeDuration:true};
    },
    activateQuestion(state, action) {
      const questionIdx = action.payload;
      state.active = { title: false, description: false, questionIdx ,timeDuration:false};
    },
    updateTitle(state, action) {
      const title = action.payload;
      state.title = title;
    },
    updateDescription(state, action) {
      const description = action.payload;
      state.description = description;
    },
    addQuestionObj(state, action) {
      const { newQuestion } = action.payload;

      state.questions.push(newQuestion);

      const activeQuestionIdx = state.questions.length - 1;
      state.active.questionIdx = activeQuestionIdx;
    },
    deleteQuestionObj(state, action) {
      const deletedQuestionIdx = action.payload;
      const questions = state.questions.filter(
        (q, idx) => idx !== deletedQuestionIdx
      );
      if (state.active.questionIdx === deletedQuestionIdx) {
        state.active.questionIdx = null;
      }
      state.questions = questions;
    },
    updateQuestion(state, action) {
      const { questionIdx, question } = action.payload;

      state.questions[questionIdx].question = question;
    },
    changeType(state, action) {
      const { questionIdx, type } = action.payload;
      const hasOptions =
        type === "multiple-choice" ||
        type === "check-boxes" ||
        type === "dropdown";

      const questions = state.questions.map((q, idx) => {
        if (idx === questionIdx) {
          q.type = type;
          if (hasOptions) {
            if (q.options.length === 0) {
              q.options.push("");
              q.activeOptionIdx = 0;
            }
          } else {
            q.options = [];
          }
        }
        return q;
      });

      state.questions = questions;
    },
    addOption(state, action) {
      const { questionIdx, option } = action.payload;

      const optionIdx = state.questions[questionIdx].options.length;

      state.questions[questionIdx].activeOptionIdx = optionIdx;

      state.questions[questionIdx].options.push(option);
    },
    deleteOption(state, action) {
      const { questionIdx, optionIdx } = action.payload;

      state.questions[questionIdx].activeOptionIdx = null;

      state.questions[questionIdx].options = state.questions[
        questionIdx
      ].options.filter((op, opIdx) => opIdx !== optionIdx);
    },
    updateOptionValue(state, action) {
      const { questionIdx, optionIdx, value } = action.payload;

      state.questions[questionIdx].options[optionIdx] = value;
    },
    activateOption(state, action) {
      const { questionIdx, optionIdx } = action.payload;

      state.questions[questionIdx].activeOptionIdx = optionIdx;
    },
    toggleRequired(state, action) {
      const idx = action.payload;

      state.questions[idx].required = !state.questions[idx].required;
    },
    resetForm(state, action) {
      return initialState;
    },
  },
});

const BASE_URL = 'http://localhost:8081';

export async function postRefinedForm(refinedForm) {
  try {
    
   
   // const  token = JSON.parse(adminData).token;
    console.log(refinedForm);
    const adminLocalStorageString = localStorage.getItem('admin');
    const adminLocalStorageObject = JSON.parse(adminLocalStorageString);
    const token = adminLocalStorageObject.token;
    console.log('admin - token - ', token);
    const res = await axios
      .post(`${`http://localhost:8800/exams/admin`}/questionforms`, refinedForm, {
        headers: {
          'x-auth-token': `${token}`,
        },
      })
      .catch((error) => console.log(error.response));
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteForm(formId) {
  try {
    const token = localStorage.getItem("admin").token;
    console.log('token - ',token);
    const res = await axios.delete(`${BASE_URL}/questionForm/${formId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getFormsList() {
  const adminLocalStorageString = localStorage.getItem("admin");
  const adminLocalStorageObject = JSON.parse(adminLocalStorageString);
  const token = adminLocalStorageObject.token;
  console.log('admin - token - ', token);
  try {
    const res = await axios
      .get(`${`http://localhost:8800/exams/admin/questionforms`}`, {
        headers: {
          'x-auth-token': `${token}`,
        },
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
      if (res.status === 200) {
        console.log('resp - ', res.data);
        const forms = res.data;
        //const allQuestions = forms.reduce((acc, form) => acc.concat(form.questions), []);
        console.log(forms);
        return forms;
      }
       else if (res.status === 401) {
      return "";
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getFormFromServer(formId) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/questionForm/${formId}`, {
    headers: {
      Authorization: token,
    },
  });

  const form = res.data.form;
  return form;
}

export async function toggleAcceptingStatus(formId) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${BASE_URL}/questionForm/formStatus/${formId}`,
    null,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  if (res.status === 200) return true;

  return false;
}

export const {
  addQuestionObj,
  deleteQuestionObj,
  updateTitle,
  updateDescription,
  updateQuestion,
  changeType,
  addOption,
  deleteOption,
  updateOptionValue,
  activateOption,
  toggleRequired,
  activateTitle,
  activateDescription,
  activateQuestion,
  resetForm,
} = newFormSlice.actions;

export default newFormSlice.reducer;

export const getActiveOptionIdx = (questionIdx) => (state) =>
  state.newForm.questions.find((q, idx) => idx === questionIdx).activeOptionIdx;

export const getActiveInfo = (state) => state.newForm.active;

export const getQuestions = (state) => state.newForm.questions;

export const getForm = (state) => state.newForm;

export const getRefinedForm = (form) => {
  const refinedForm = {
    title: form.title,
    description: form.description,
    timeDuration:"0",
    questions: form.questions.map((q) => {
      const { question, type, options, required } = q;
      if (type === "") {
        return { question, type: "short-ans", options, required };
      }
      return { question, type, options, required };
    }),
  };

  return refinedForm;
};
