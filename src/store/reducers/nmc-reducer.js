import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nmcProfileData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
  collegeApprovalData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
};

const nmcReducer = createSlice({
  name: 'nmc-reducer',
  initialState,
  reducers: {
    getNMCProfile: (state, action) => {
      state.nmcProfileData = action.payload;
    },
    getCollegeApproval: (state, action) => {
      state.collegeApprovalData = action.payload;
    },
  },
});

export const { getNMCProfile, getCollegeApproval } = nmcReducer.actions;

export default nmcReducer.reducer;
