import { createSlice } from '@reduxjs/toolkit';

import { SessionTimer } from '../../constants/session-timer';

const sessionTiming = 0.5;

const initialState = {
  apiLoading: false,
  isloggedIn: false,
  timer: 0,
  mobileNumber: undefined,
  loggedInUserType: '',
  userActiveTab: '',
  statesList: { data: [], isLoading: Boolean(true), isError: false },
  citiesList: { data: [], isLoading: Boolean(true), isError: false },
  countriesList: { data: [], isLoading: Boolean(true), isError: false },
  districtsList: { data: [], isLoading: Boolean(true), isError: false },
  subDistrictList: { data: [], isLoading: Boolean(true), isError: false },
  sendNotificationOtpData: { data: [], isLoading: Boolean(true), isError: false },
  verifyNotificationOtpData: { data: [], isLoading: Boolean(true), isError: false },
  languagesList: { data: [], isLoading: Boolean(true), isError: false },
  universitiesList: { data: [], isLoading: Boolean(true), isError: false },
  collegesList: { data: [], isLoading: Boolean(true), isError: false },
  allcollegesList: { data: [], isLoading: Boolean(true), isError: false },
  getCollegeDetail: { data: [], isLoading: Boolean(true), isError: false },
  updateCollegeDetail: { data: [], isLoading: Boolean(true), isError: false },
  coursesList: { data: [], isLoading: Boolean(true), isError: false },
  specialitiesList: { data: [], isLoading: Boolean(true), isError: false },
  councilNames: { data: [], isLoading: Boolean(true), isError: false },
  trackStatusData: { data: [], isLoading: Boolean(true), isError: false },
  initiateWorkFlow: { data: [], isLoading: Boolean(true), isError: false },
  activateLicenseList: { data: [], isLoading: Boolean(true), isError: false },
  trackApplicationTableData: { data: [], isLoading: Boolean(true), isError: false },
  changePasswordData: { data: [], isLoading: Boolean(true), isError: false },
  doctorTrackApplicationTableData: { data: [], isLoading: Boolean(true), isError: false },
  selectedAcademicStatus: '',
  breadcrumbsActivetab: '',
};

export const CommonActivity = createSlice({
  name: 'common',
  initialState,
  reducers: {
    resetCommonReducer: () => initialState,
    login: (state) => {
      state.isloggedIn = true;
      state.timer = SessionTimer(sessionTiming * 60);
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.timer = 0;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    userLoggedInType: (state, action) => {
      state.loggedInUserType = action.payload;
    },
    setApiLoading: (state, action) => {
      state.apiLoading = action.payload;
    },
    changeUserActiveTab: (state, action) => {
      state.userActiveTab = action.payload;
    },
    getStates: (state, action) => {
      state.statesList = action.payload;
    },
    getCities: (state, action) => {
      state.citiesList = action.payload;
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
    sendNotificationData: (state, action) => {
      state.sendNotificationOtpData = action.payload;
    },
    verifyNotificationData: (state, action) => {
      state.verifyNotificationOtpData = action.payload;
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
    getAllColleges: (state, action) => {
      state.allcollegesList.data = action.payload;
    },
    getCollegeDetail: (state, action) => {
      state.getCollegeDetail.data = action.payload;
    },
    updateCollegeDetail: (state, action) => {
      state.updateCollegeDetail.data = action.payload;
    },
    getCourses: (state, action) => {
      state.coursesList.data = action.payload;
    },
    getSpecialities: (state, action) => {
      state.specialitiesList.data = action.payload;
    },
    updateCouncilNames: (state, action) => {
      state.councilNames = action.payload;
    },
    searchTrackStatusData: (state, action) => {
      state.trackStatusData.data = action.payload;
    },
    getInitiateWorkFlow: (state, action) => {
      state.initiateWorkFlow = action.payload;
    },
    getActivateLicense: (state, action) => {
      state.activateLicenseList = action.payload;
    },
    updateTrackApplicationTableData: (state, action) => {
      state.trackApplicationTableData.data = action.payload;
    },
    updateDoctorTrackApplication: (state, action) => {
      state.doctorTrackApplicationTableData.data = action.payload;
    },
    setNewPassword: (state, action) => {
      state.changePasswordData = action.payload;
    },
    setSelectedAcademicStatus: (state, action) => {
      state.selectedAcademicStatus = action.payload;
    },
    setBreadcrumbsActivetab: (state, action) => {
      state.breadcrumbsActivetab = action.payload;
    },
  },
});

export const {
  login,
  logout,
  fontsizes,
  setMobileNumber,
  userLoggedInType,
  resetCommonReducer,
  setApiLoading,
  changeUserActiveTab,
  getStates,
  getCities,
  getCountries,
  getDistricts,
  getSubDistricts,
  sendNotificationData,
  verifyNotificationData,
  getLanguages,
  getColleges,
  getAllColleges,
  getCollegeDetail,
  updateCollegeDetail,
  getUniversities,
  getCourses,
  getSpecialities,
  updateCouncilNames,
  searchTrackStatusData,
  getInitiateWorkFlow,
  getActivateLicense,
  updateTrackApplicationTableData,
  setNewPassword,
  setSelectedAcademicStatus,
  setBreadcrumbsActivetab,
  updateDoctorTrackApplication,
} = CommonActivity.actions;

export default CommonActivity.reducer;
