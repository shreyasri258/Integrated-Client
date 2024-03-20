import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  malpracticeAttempts: 0,
  time: 0,
  isTimeExpired: false, // Add isTimeExpired to the initial state
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementMalPracticeAttempts(state) {
      state.malpracticeAttempts+=1;
      console.log("malPrac in getMalPrac - ", JSON.stringify(state));
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setTimeExpired(state, action) {
      // Add setTimeExpired reducer
      console.log(
        `time in examTimer - ${JSON.stringify(state)},<===>, ${JSON.stringify(
          action
        )}`
      );
      state.isTimeExpired = action.payload;
    },
  },
});

export const { incrementMalPracticeAttempts, setTime, setTimeExpired } =
  timerSlice.actions;

export default timerSlice.reducer;

export const getMalPracticeAttempts = (state) => {
  // console.log('malPrac in getMalPrac - ',state.timer)
  return state.timer.malpracticeAttempts;
};

export const getTime = (state) => {
  return state.timer.time;
};

export const getTimeExpired = (state) => {
  console.log("ans in getTimeExp - ", state.timer);
  return state.timer.isTimeExpired;
}; // Add selector for isTimeExpired
