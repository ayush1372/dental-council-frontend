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
    trackApplicationData: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}/applications',
    profileConsent: 'api/v1/abdm/nmr/health-professional/register',
    createPersonalDetails: '/api/v1/abdm/nmr/health-professional/personal',
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
    changePassword: 'api/v1/abdm/nmr/user/change-password',
    activateLicense: 'api/v1/abdm/nmr/health-professional/applications/re-activate',
    healthProfessionalApplicationStatus: 'api/v1/abdm/nmr/health-professional/applications/status',
    suspend: 'api/v1/abdm/nmr/health-professional/applications/suspend',
    enableNotification: '/api/v1/abdm/nmr/user/enable-notification',
  },
  college: {
    registrar: 'api/v1/abdm/nmr/college/{collegeId}/registrar',
    dean: 'api/v1/abdm/nmr/college/{collegeId}/dean',
    getCollegeProfile: 'api/v1/abdm/nmr/college/{id}',
    getCollegeRegistrarProfile: 'api/v1/abdm/nmr/college/{collegeId}/registrar/{id}',
    getCollegeDeanProfile: 'api/v1/abdm/nmr/college/{collegeId}/dean/{id}',
    register: 'api/v1/abdm/nmr/college/applications',
    initiateCollegeWorkFlow: 'api/v1/abdm/nmr/college/applications/status',
  },
  nmc: {
    getNMCProfileData: 'api/v1/abdm/nmr/nmc/user/{id}',
    collegeApproval: 'api/v1/abdm/nmr/college/applications',
  },
  dashboard: {
    cardCount: 'api/v1/abdm/nmr/dashboards/cards',
    cardDetails: 'api/v1/abdm/nmr/dashboards/card-detail',
  },
  smc: {
    getSMCProfileData: 'api/v1/abdm/nmr/smc/user/{id}',
  },
  doctorRegistration: {
    smcRegistrationDetail:
      'api/v1/abdm/nmr/health-professional?smcId={smcId}&registrationNumber={registrationNumber}',
    passwordLink: 'api/v1/abdm/nmr/user/password-link',
  },
  nbe: {
    getNBEProfileData: 'api/v1/abdm/nmr/nbe/user/{id}',
  },
  forgotPassword: {
    setPassword: '/api/v1/abdm/nmr/user/set-password',
  },
  searchDoctor: {
    searchDoctorDetails: 'api/v1/abdm/nmr/health-professional/search',
    searchDoctorById: 'api/v1/abdm/nmr/health-professional/{healthProfessionalId}',
  },
};
export const API_HPRID = {
  hpId: {
    checkHprIdExists: 'api/v2/registration/aadhaar/checkHpIdAccountExist',
    hpIdSuggestion: 'api/v1/registration/aadhaar/hpid/suggestion',
    sessionApi: 'gateway/v0.5/sessions',
    sendAadhaarOtp: 'api/v1/registration/aadhaar/generateOtp',
    verifyAadhaarOtp: 'api/v1/registration/aadhaar/verifyOTP',
    generateMobileOtp: 'api/v1/registration/aadhaar/generateMobileOTP',
    verifyMobileOtp: '/api/v1/registration/aadhaar/verifyMobileOTP',
    createHprId: 'api/v1/registration/aadhaar/createHprIdWithPreVerified',
  },
};
