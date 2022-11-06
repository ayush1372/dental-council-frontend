import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: { data: [], isLoading: Boolean(true), isError: false },
  tokenDetails: { data: [], isLoading: Boolean(true), isError: false },
};

const contactReducer = createSlice({
  name: 'getUser-reducer',
  initialState,
  reducers: {
    updateUserList: (state, action) => {
      state.usersList = action.payload;
    },
    updateToken: (state, action) => {
      state.tokenDetails = action.payload;
    },
  },
});

export const { updateUserList, updateSingleDrop, updateMultiDrop, updateToken } =
  contactReducer.actions;

export default contactReducer.reducer;
