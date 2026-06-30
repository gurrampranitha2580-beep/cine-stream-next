import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genre: 0,
  year: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setGenre(state, action) {
      state.genre = action.payload;
    },

    setYear(state, action) {
      state.year = action.payload;
    },

    resetFilters(state) {
      state.genre = 0; 
      state.year = "all";
    },
  },
});

export const {
  setGenre,
  setYear,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;