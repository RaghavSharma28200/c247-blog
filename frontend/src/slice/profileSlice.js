import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profileData",
  initialState: {
    userData: {},
  },
  reducers: {
    setProfileData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;

export default profileSlice.reducer;
