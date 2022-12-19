import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: { data: [] },
};

const personalDetailsReducer = createSlice({
  name: 'personalDetailsReducer',
  initialState,
  reducers: {
    updateCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { updateCities } = personalDetailsReducer.actions;

export default personalDetailsReducer.reducer;
