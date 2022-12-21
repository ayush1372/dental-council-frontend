import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statesList: { data: [], isLoading: Boolean(true), isError: false },
  countriesList: { data: [], isLoading: Boolean(true), isError: false },
};

const menuLists = createSlice({
  name: 'menuLists',
  initialState,
  reducers: {
    getStates: (state, action) => {
      state.statesList = action.payload;
    },
    getCountries: (state, action) => {
      state.countriesList = action.payload;
    },
  },
});

export const { getStates, getCountries } = menuLists.actions;

export default menuLists.reducer;
