import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) { 
      console.log("From Auth Slice ",value.payload)
      state.signupData = value.payload;
    },
    setLoading(state, value) { 
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});
// console.log(state.signupData)
export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;