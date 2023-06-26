export const API = {
  login: {
    getCaptchaEnabledFlag: 'captcha-enabled',
    generateCaptcha: 'generate-captcha',
    validateCaptcha: 'verify-captcha',
    loginUser: 'user/login',
    refreshToken: 'user/refreshToken',
  },
  DoctorUserProfileData: {
    personalDetails: 'health-professional/{healthProfessionalId}/personal',
    registrationDetails: 'health-professional/{healthProfessionalId}/registration',
    workProfileDetails: 'health-professional/{healthProfessionalId}/work-profile',
    workProfileDeLink: 'health-professional/work-profile/facility',
    profileImage: 'health-professional/{healthProfessionalId}/profile-picture',
    initiateWorkFlow: 'health-professional/applications/status',
    trackApplicationData: 'health-professional/{healthProfessionalId}/applications',
    trackApplicationStatus: 'applications/{requestId}',
    eSign: 'e-signature',
    profileConsent: 'health-professional/register',
    createPersonalDetails: '/health-professional/personal',
    additionalQualifications: '/health-professional/{healthProfessionalId}/qualifications',
    searchFacilities: '/facilities/search',
    verifyEmail: '/health-professional/{healthProfessionalId}/email',
    userVerifyEmail: '/user/verify-email',
  },
  common: {
    states: 'countries/356/states',
    cities: 'countries/states/districts/sub-districts/{sub_district_id}/cities',
    countries: 'countries',
    subDistricts: 'countries/states/districts/{district_id}/sub_districts',
    districts: 'countries/states/{state_id}/districts',
    sendOtp: 'notification/send-otp',
    verifyOtp: 'notification/verify-otp',
    languages: 'languages',
    universities: 'university',
    colleges: 'college',
    allColleges: 'colleges',
    college: 'colleges/{id}',
    courses: 'courses',
    specialities: 'specialities',
    councilNames: 'state-medical-councils',
    trackStatus: 'health-professional/applications',
    changePassword: 'user/change-password',
    activateLicense: 'health-professional/applications/re-activate',
    healthProfessionalApplicationStatus: 'health-professional/applications/status',
    suspend: 'health-professional/applications/suspend',
    queryRaise: 'health-professional/queries',
    raisedQuery: 'health-professional/{healthProfessionalId}/queries',
    enableNotification: '/user/enable-notification',
    LGDService: '/health-professional/lgd/search?pinCode=',
  },
  college: {
    registrar: 'college/{collegeId}/registrar',
    dean: 'college/{collegeId}/dean',
    getCollegeProfile: 'college/{id}',
    getCollegeRegistrarProfile: 'college/{collegeId}/registrar/{id}',
    getCollegeDeanProfile: 'college/{collegeId}/dean/{id}',
    register: 'college/applications',
    initiateCollegeWorkFlow: 'college/applications/status',
    admindesignation: 'colleges/verifiers/designations',
    adminVerifier: 'colleges/{collegeId}/verifiers',
    collegeProfile: 'colleges/{collegeId}/verifiers/{verifierId}',
  },
  nmc: {
    getNMCProfileData: 'nmc/user/{id}',
    collegeApproval: 'college/applications',
  },
  dashboard: {
    cardCount: 'dashboards/cards',
    cardDetails: 'dashboards/card-detail',
  },
  smc: {
    getSMCProfileData: 'smc/user/{id}',
  },
  kyc: {
    kycCheck: 'health-professional/{registrationNumber}/kyc?councilId={councilId}',
  },
  doctorRegistration: {
    smcRegistrationDetail:
      'health-professional?smcId={smcId}&registrationNumber={registrationNumber}',
    setUserPassword: 'health-professional/user',
    healthProfesssional: '/health-professional',
    validateUserRegistration: 'user-accounts?mobileNumber={mobileNumber}&userType=1',
  },
  nbe: {
    getNBEProfileData: 'nbe/user/{id}',
  },
  forgotUserName: {
    retrieveUser: 'retrieve-user',
  },
  forgotPassword: {
    setPassword: '/user/set-password',
    reSetPassword: 'user/reset-password',
  },
  searchDoctor: {
    searchDoctorDetails: 'health-professional/search',
    searchDoctorById: 'health-professional/{healthProfessionalId}',
  },
};
export const API_HPRID = {
  hpId: {
    sessionApi: '/sessions',
    sendAadhaarOtp: 'api/v2/registration/aadhaar/generateOtp',
    verifyAadhaarOtp: 'api/v2/registration/aadhaar/verifyOTP',
    generateMobileOtp: 'api/v1/registration/aadhaar/generateMobileOTP',
    verifyMobileOtp: '/api/v2/registration/aadhaar/verifyMobileOTP',
    demographicAuthMobile: 'api/v2/registration/aadhaar/demographicAuthViaMobile',
    checkHprIdExists: 'api/v2/registration/aadhaar/checkHpIdAccountExist',
    hpIdSuggestion: 'api/v1/registration/aadhaar/hpid/suggestion',
    createHprId: 'api/v1/registration/aadhaar/createHprIdWithPreVerified',
  },
};
