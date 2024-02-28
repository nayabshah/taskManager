import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: null,
  isError: false,
  isSuccess: false,
  message: "",
  currentPage: 1,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setTasksList: (state, action) => {
      state.tasks = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { reset, setTasksList, setCurrentPage } = tasksSlice.actions;
export default tasksSlice.reducer;
