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
  DoctorUserProfileData: {
    QualificationDetails: 'api/v1/hp/health-professional/registration/176',
    WorkProfileDetails: 'api/v1/hp/health-professional/work-profile/165',
    DoctorUserProfile: 'api/v1/hp/hpProfileDetail/',
    profileImage: 'api/v1/hp/hpProfileDetail/profile_picture/{hp_profile_id}',
  },
  common: {
    states: 'api/v1/md/country/356/states',
    cities: 'api/v1/md/sub_district/{sub_district_id}/cities',
    countries: 'api/v1/md/countries',
    subDistricts: 'api/v1/md/district/{district_id}/sub_districts',
    districts: 'api/v1/md/state/{state_id}/districts',
    sendOtp: 'api/v1/notification/send-otp',
    verifyOtp: 'api/v1/notification/verify-otp',
    languages: 'api/v1/md/languages',
    universities: 'api/v1/md/universities',
    colleges: 'api/v1/md/university/{university_id}/colleges',
    courses: 'api/v1/md/courses',
    specialities: 'api/v1/md/specialities',
    councilNames: 'api/v1/md/smcs',
  },
  college: {
    registrar: 'api/v1/college/registrar',
    dean: 'api/v1/college/dean',
    getCollegeProfile: 'api/v1/college/{id}',
    getCollegeRegistrarProfile: '/api/v1/college/registrar/{id}',
    getCollegeDeanProfile: '/api/v1/college/dean/{id}',
    register: 'api/v1/college',
    initiateCollegeWorkFlow: '/api/v1/colleges/action',
  },
  nmc: {
    getNMCProfileData: '/api/v1/user/nmc/{id}',
    collegeApproval: '/api/v1/registration/colleges',
  },
  Aadhaar: {
    sendAadhaarOtp: 'api/v1/sendAadhaarOtp',
    verifyAadhaarOtp: 'api/v1/verifyAadhaarOtp',
  },
  dashboard: {
    cardCount: '/api/v1/dashboard/cardCount',
  },
  smc: {
    getSMCProfileData: '/api/v1/user/smc/{id}',
  },
  nbe: {
    getNBEProfileData: '/api/v1/user/nbe/{id}',
  },
};
