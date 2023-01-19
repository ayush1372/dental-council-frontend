/* eslint-disable no-console */
import { API } from '../../api/api-endpoints';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  detailsOfRegistrar,
  getCollegeAdminData,
  getCollegeDeanData,
  getCollegeRegistrarData,
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

export const sendRegistrarDetails = (details) => async (dispatch) => {
  console.log('onsubmit response for registrar==>', details);
  let id = null;
  let name = details.registrarName;
  let phone_number = details.registrarPhoneNumber;
  let email_id = details.registrarEmail;
  let user_id = null;
  let password = details.registrarPassword;
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.registrar,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: {
        id,
        name,
        phone_number,
        email_id,
        user_id,
        password,
      },
    })
      .then((response) => {
        console.log(response, 'response of registrar');
        dispatch(detailsOfRegistrar(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
