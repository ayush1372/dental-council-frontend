import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  changePasswordData: { data: [], isLoading: Boolean(true), isError: false },
};

export const ChangePasswordReducer = createSlice({
  name: 'change-password',
  initialState,
  reducers: {
    setNewPassword: (state, action) => {
      state.changePasswordData = action.payload;
    },
  },
});

export const { setNewPassword } = ChangePasswordReducer.actions;

export default ChangePasswordReducer.reducer;
