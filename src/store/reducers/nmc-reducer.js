import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nmcProfileData: {
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
  },
});

export const { getNMCProfile } = nmcReducer.actions;

export default nmcReducer.reducer;
