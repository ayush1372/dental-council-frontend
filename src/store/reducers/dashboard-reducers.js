import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: { data: [], isLoading: Boolean(true), isError: false },
  dashboardTableDetails: { data: [], isLoading: Boolean(true), isError: false },
};

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardReducer: () => initialState,
    cardCountDetails: (state, action) => {
      state.count = action.payload;
    },
    dashboardTableData: (state, action) => {
      state.dashboardTableDetails = action.payload;
    },
  },
});

export const { cardCountDetails, dashboardTableData } = dashboardReducer.actions;

export default dashboardReducer.reducer;
