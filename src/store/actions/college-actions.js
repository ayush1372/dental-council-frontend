import { API } from '../../api/api-endpoints';
import { GET, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getCollegeAdminData,
  getCollegeDeanData,
  getCollegeRegistrarData,
  // updateCollegeAdminProfile
} from '../reducers/college-reducer';

export const getCollegeAdminProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeProfile.replace('{id}', id),
      // data: {},
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeAdminData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCollegeAdminData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};

export const getCollegeRegistrarProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeRegistrarProfile.replace('{id}', id),
      // data: {},
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(
          getCollegeRegistrarData({ data: response.data, isError: false, isLoading: false })
        );
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCollegeRegistrarData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};

export const getCollegeDeanProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeDeanProfile.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeDeanData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCollegeDeanData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};

export const updateCollegeAdminProfileData = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.editProfile.editAdminCollegeProfile,
      data: body,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('inside action', response);
        //  dispatch(updateCollegeAdminProfile(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
