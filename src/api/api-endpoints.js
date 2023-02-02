export const API = {
  registration: {
    createUser: 'posts',
  },
  login: {
    getCaptchaEnabledFlag: 'api/v1/getCaptchaEnabledFlag',
    generateCaptcha: 'api/v1/generateCaptcha',
    validateCaptcha: 'api/v1/validateCaptcha',
    loginUser: 'api/v1/login',
  },
  editProfile: {
    editAdminCollegeProfile: 'api/v1/college',
  },
  DoctorUserProfileData: {
    DoctorUserProfile: 'api/v1/hp/hpProfileDetail/23',
  },
  common: {
    states: 'api/v1/md/country/356/states',
    cities: 'api/v1/md/sub_district/{sub_district_id}/cities',
    countries: 'api/v1/md/countries',
    subDistricts: 'api/v1/md/district/{district_id}/sub_districts',
    districts: 'api/v1/md/state/{state_id}/districts',
    getCouncilNames: 'api/v1/md/smcs',
    getUniversityNames: 'api/v1/md/universities',
    sendOtp: 'api/v1/notification/send-otp',
    verifyOtp: 'api/v1/notification/verify-otp',
  },
  college: {
    registrar: 'api/v1/college/registrar',
    dean: 'api/v1/college/dean',
    getCollegeProfile: 'api/v1/college/{id}',
    getCollegeRegistrarProfile: '/api/v1/college/registrar/{id}',
    getCollegeDeanProfile: '/api/v1/college/dean/{id}',
    register: 'api/v1/college',
  },
  Aadhaar: {
    sendAadhaarOtp: 'api/v1/sendAadhaarOtp',
    verifyAadhaarOtp: 'api/v1/verifyAadhaarOtp',
  },
};
