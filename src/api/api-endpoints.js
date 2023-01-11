export const API = {
  registration: {
    createUser: 'posts',
  },
  loginUser: {
    userType: '/login',
  },
  editProfile: {},
  DoctorUserProfileData: {
    DoctorUserProfile: 'api/v1/hp/hpProfileDetail/23',
  },
  menuLists: {
    states: 'api/v1/md/country/356/states',
    cities: 'api/v1/md/sub_district/{sub_district_id}/cities',
    countries: 'api/v1/md/countries',
    subDistricts: 'api/v1/md/district/{district_id}/sub_districts',
    districts: 'api/v1/md/state/{state_id}/districts',
  },
};
