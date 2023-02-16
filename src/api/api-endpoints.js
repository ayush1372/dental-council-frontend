export const API = {
  login: {
    getCaptchaEnabledFlag: 'api/v1/abdm/nmr/captcha-enabled',
    generateCaptcha: 'api/v1/abdm/nmr/generate-captcha',
    validateCaptcha: 'api/v1/abdm/nmr/verify-captcha',
    loginUser: 'api/v1/abdm/nmr/user/login',
    refreshToken: 'api/v1/abdm/nmr/user/refreshToken',
  },
  DoctorUserProfileData: {
    personalDetails: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}/personal',
    registrationDetails: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}/registration',
    workProfileDetails: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}/work-profile',
    profileImage: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}/profile-picture',
    initiateWorkFlow: 'api/v1/abdm/nmr/health-professional/applications/status',
  },
  common: {
    states: 'api/v1/abdm/nmr/countries/356/states',
    cities: 'api/v1/abdm/nmr/countries/states/districts/sub-districts/{sub_district_id}/cities',
    countries: 'api/v1/abdm/nmr/countries',
    subDistricts: 'api/v1/abdm/nmr/countries/states/districts/{district_id}/sub_districts',
    districts: 'api/v1/abdm/nmr/countries/states/{state_id}/districts',
    sendOtp: 'api/v1/abdm/nmr/notification/send-otp',
    verifyOtp: 'api/v1/abdm/nmr/notification/verify-otp',
    languages: 'api/v1/abdm/nmr/languages',
    universities: 'api/v1/abdm/nmr/universities',
    colleges: 'api/v1/abdm/nmr/universities/{university_id}/colleges',
    courses: 'api/v1/abdm/nmr/courses',
    specialities: 'api/v1/abdm/nmr/specialities',
    councilNames: 'api/v1/abdm/nmr/state-medical-councils',
    trackStatus: 'api/v1/abdm/nmr/health-professional/applications',
  },
  college: {
    registrar: 'api/v1/abdm/nmr/college/{collegeId}/registrar',
    dean: 'api/v1/abdm/nmr/college/{collegeId}/dean',
    getCollegeProfile: 'api/v1/abdm/nmr/college/{id}',
    getCollegeRegistrarProfile: 'api/v1/abdm/nmr/college/{collegeId}/registrar/{id}',
    getCollegeDeanProfile: 'api/v1/abdm/nmr/college/{collegeId}/dean/{id}',
    register: 'api/v1/abdm/nmr/college',
    initiateCollegeWorkFlow: 'api/v1/abdm/nmr/college/applications/status',
  },
  nmc: {
    getNMCProfileData: 'api/v1/abdm/nmr/nmc/user/{id}',
    collegeApproval: 'api/v1/abdm/nmr/college/applications',
  },
  Aadhaar: {
    sendAadhaarOtp: 'api/v1/abdm/nmr/aadhaar/send-otp',
    verifyAadhaarOtp: 'api/v1/abdm/nmr/aadhaar/verify-otp',
  },
  smc: {
    getSMCProfileData: 'api/v1/abdm/nmr/smc/user/{id}',
  },
  nbe: {
    getNBEProfileData: 'api/v1/abdm/nmr/nbe/user/{id}',
  },
  forgotPassword: {
    doctor: '/api/v1/reset-password',
    smc: '/api/v1/reset-password',
    nmc: '/api/v1/reset-password',
  },
};
