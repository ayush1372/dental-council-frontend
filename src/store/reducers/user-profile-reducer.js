import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: { data: [] },
};

const userProfileReducer = createSlice({
  name: 'userProfileReducer',
  initialState,
  reducers: {
    updateCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { updateCountries } = userProfileReducer.actions;

export default userProfileReducer.reducer;
