import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';

const initialState = {
  statesList: [],
};

export const fetchStates = createAsyncThunk(API.menuLists.states, async () => {
  const response = await useAxiosCall(GET, API.menuLists.states)();
  return response;
});

const menuLists = createSlice({
  name: 'menuLists',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStates.fulfilled]: (state, action) => {
      state.statesList = action.payload;
    },
  },
});

export default menuLists.reducer;
