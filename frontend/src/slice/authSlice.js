import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authData",
  initialState: {
    auth:false
  },
  reducers: {
    setLogin: (state, action) => {
      state.auth = true;
    },
    setLogout: (state, action) => {
      state.auth= false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
