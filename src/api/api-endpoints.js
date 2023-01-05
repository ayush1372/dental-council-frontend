export const API = {
  registration: {
    createUser: 'posts',
  },
  loginUser: {
    userType: '/login',
  },
  editProfile: {},
  menuLists: {
    states: 'api/v1/md/country/356/states',
    countries: 'api/v1/md/countries',
    subDistricts: 'api/v1/md/district/{district_id}/sub_districts',
    districts: 'api/v1/md/state/{state_id}/districts',
  },
  college: {
    registrar: 'api/v1/college/registrar',
    dean: 'api/v1/college/dean',
  },
};
