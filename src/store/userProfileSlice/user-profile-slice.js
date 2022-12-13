import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';

const initialState = {
  countries: { data: [] },
  states: { data: [] },
};

export const fetchCountries = createAsyncThunk(API.menuLists.countries, async () => {
  const response = await useAxiosCall(GET, API.menuLists.countries)();
  return response;
});

export const fetchStates = createAsyncThunk(API.menuLists.states, async () => {
  const response = await useAxiosCall(GET, API.menuLists.states)();
  return response;
});

const userProfileReducer = createSlice({
  name: 'userProfileReducer',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountries.fulfilled]: (state, action) => {
      state.countries = action.payload;
    },
    [fetchStates.fulfilled]: (state, action) => {
      state.states = action.payload;
    },
  },
});

// export const { updateCountries } = userProfileReducer.actions;

export default userProfileReducer.reducer;
