import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  raiseQueryData: {
    queryRaisedFor: [],
  },
};

const raiseQueryReducer = createSlice({
  name: 'raise-query-reducer',
  initialState,
  reducers: {
    getRaiseQueryData: (state, action) => {
      state.raiseQueryData = action.payload;
    },
  },
});

export const { getRaiseQueryData } = raiseQueryReducer.actions;

export default raiseQueryReducer.reducer;
