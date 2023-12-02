import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    signInFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    updateFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      (state.currentUser = null), (state.error = null), (state.loading = false);
    },
    deleteFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      (state.currentUser = null), (state.error = null), (state.loading = false);
    },
    signOutFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    }
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} = userSlice.actions;

export default userSlice.reducer;
