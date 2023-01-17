import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statesList: { data: [], isLoading: Boolean(true), isError: false },
  countriesList: { data: [], isLoading: Boolean(true), isError: false },
  districtsList: { data: [], isLoading: Boolean(true), isError: false },
  subDistrictList: { data: [], isLoading: Boolean(true), isError: false },
  languagesList: { data: [], isLoading: Boolean(true), isError: false },
  universitiesList: { data: [], isLoading: Boolean(true), isError: false },
  collegesList: { data: [], isLoading: Boolean(true), isError: false },
  coursesList: { data: [], isLoading: Boolean(true), isError: false },
  specialitiesList: { data: [], isLoading: Boolean(true), isError: false },
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
    getDistricts: (state, action) => {
      state.districtsList = action.payload;
    },
    getSubDistricts: (state, action) => {
      state.subDistrictList = action.payload;
    },
    getLanguages: (state, action) => {
      state.languagesList.data = action.payload;
    },
    getUniversities: (state, action) => {
      state.universitiesList.data = action.payload;
    },
    getColleges: (state, action) => {
      state.collegesList.data = action.payload;
    },
    getCourses: (state, action) => {
      state.coursesList.data = action.payload;
    },
    getSpecialities: (state, action) => {
      state.specialitiesList.data = action.payload;
    },
  },
});

export const {
  getStates,
  getCountries,
  getDistricts,
  getSubDistricts,
  getLanguages,
  getColleges,
  getUniversities,
  getCourses,
  getSpecialities,
} = menuLists.actions;

export default menuLists.reducer;
