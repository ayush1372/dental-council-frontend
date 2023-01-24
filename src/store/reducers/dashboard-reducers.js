import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: { data: [], isLoading: Boolean(true), isError: false },
};

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardReducer: () => initialState,
    cardCountDetails: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { cardCountDetails } = dashboardReducer.actions;

export default dashboardReducer.reducer;
