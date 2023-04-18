import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: { status: [], isLoading: Boolean(true), isError: false },
};

const forgotUserName = createSlice({
  name: 'forgotUserName',
  initialState,
  reducers: {
    getForgotUserName: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { getForgotUserName } = forgotUserName.actions;

export default forgotUserName.reducer;
