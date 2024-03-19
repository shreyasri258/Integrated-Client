import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalMalpractices: 0,
  time: 0,
  isTimeExpired: false, // Add isTimeExpired to the initial state
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementMalpractices(state) {
      state.totalMalpractices++;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setTimeExpired(state, action) { // Add setTimeExpired reducer
        console.log(`time in examTimer - ${JSON.stringify(state)},<===>, ${JSON.stringify(action)}`)
      state.isTimeExpired = action.payload;
    },
  },
});

export const { incrementMalpractices, setTime, setTimeExpired } = timerSlice.actions;

export default timerSlice.reducer;

export const getTotalMalpractices = (state) =>{ 
    
    return state.timer.totalMalpractices;
}

export const getTime = (state) => {return state.timer.time;}

export const getTimeExpired = (state) =>{ 
    console.log('ans in getTimeExp - ',state.timer)
    return state.timer.isTimeExpired;} // Add selector for isTimeExpired
