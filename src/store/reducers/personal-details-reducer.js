import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  citiesList: { data: [], isLoading: Boolean(true), isError: false },
};

const cityList = createSlice({
  name: 'cityList',
  initialState,
  reducers: {
    getCities: (state, action) => {
      state.citiesList = action.payload;
    },
  },
});

export const { getCities } = cityList.actions;

export default cityList.reducer;
