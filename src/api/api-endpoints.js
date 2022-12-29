// Format for API endpoints according to modules
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
    cities: 'api/v1/md/sub_district/4152/cities',
    countries: 'api/v1/md/countries',
    districts: 'api/v1/md/state/{state_id}/districts',
  },
};
