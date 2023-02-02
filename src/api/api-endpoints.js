export const API = {
  registration: {
    createUser: 'posts',
  },
  login: {
    getCaptchaEnabledFlag: 'api/v1/getCaptchaEnabledFlag',
    generateCaptcha: 'api/v1/generateCaptcha',
    validateCaptcha: 'api/v1/validateCaptcha',
    loginUser: 'api/v1/login',
    refreshToken: 'api/v1/refreshToken',
  },
  editProfile: {},
  DoctorUserProfileData: {
    DoctorUserProfile: 'api/v1/hp/hpProfileDetail/',
    profileImage: 'api/v1/hp/hpProfileDetail/profile_picture/{hp_profile_id}',
  },
  common: {
    states: 'api/v1/md/country/356/states',
    cities: 'api/v1/md/sub_district/{sub_district_id}/cities',
    countries: 'api/v1/md/countries',
    subDistricts: 'api/v1/md/district/{district_id}/sub_districts',
    districts: 'api/v1/md/state/{state_id}/districts',
  },
  college: {
    registrar: 'api/v1/college/registrar',
    dean: 'api/v1/college/dean',
    getCollegeProfile: 'api/v1/college/{id}',
    getCollegeRegistrarProfile: '/api/v1/college/registrar/{id}',
    getCollegeDeanProfile: '/api/v1/college/dean/{id}',
    initiateCollegeWorkFlow: '/api/v1/action/initiateCollegeWorkFlow',
  },
  nmc: {
    getNMCProfileData: '/api/v1/user/nmc/{id}',
    collegeApproval: '/api/v1/registration/colleges',
  },
  Aadhaar: {
    sendAadhaarOtp: 'api/v1/sendAadhaarOtp',
    verifyAadhaarOtp: 'api/v1/verifyAadhaarOtp',
  },
  smc: {
    getSMCProfileData: '/api/v1/user/smc/{id}',
  },
};
