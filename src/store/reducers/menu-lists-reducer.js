import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statesList: { data: [], isLoading: Boolean(true), isError: false },
  districtsList: { data: [], isLoading: Boolean(true), isError: false },
};

const menuLists = createSlice({
  name: 'menuLists',
  initialState,
  reducers: {
    getStates: (state, action) => {
      state.statesList = action.payload;
    },
    getDistricts: (state, action) => {
      state.districtsList = action.payload;
    },
  },
});

export const { getStates, getDistricts } = menuLists.actions;

export default menuLists.reducer;
