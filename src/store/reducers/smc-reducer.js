import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  smcProfileData: {
    data: [],
    isLoading: Boolean(true),
    isError: false,
  },
};

const smcReducer = createSlice({
  name: 'smc-reducer',
  initialState,
  reducers: {
    getSMCProfile: (state, action) => {
      state.smcProfileData = action.payload;
    },
  },
});

export const { getNMCProfile } = smcReducer.actions;

export default smcReducer.reducer;
