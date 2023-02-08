import { API } from '../../api/api-endpoints';
import { GET, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  collegeRegister,
  detailsOfDean,
  detailsOfRegistrar,
  getCollegeAdminData,
  getCollegeDeanData,
  getCollegeRegistrarData,
  // updateCollegeAdminProfile
  postInitiateCollegeWorkFlow,
} from '../reducers/college-reducer';

export const getCollegeAdminProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeProfile.replace('{id}', id),
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
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.registrar,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: details,
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('registrar response', response);
        dispatch(detailsOfRegistrar(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const sendDeanDetails = (details) => async (dispatch) => {
  let id = null;
  let name = details.deanName;
  let phone_number = details.deanPhoneNumber;
  let email_id = details.deanEmail;
  let user_id = null;
  let password = details.deanPassword;
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.dean,
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
        dispatch(detailsOfDean(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateCollegeAdminProfileData = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.college.register,
      data: body,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const registerCollegeDetails = (collegeDetails) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.register,
      data: collegeDetails,
    })
      .then((response) => {
        dispatch(collegeRegister(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const initiateCollegeWorkFlow = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.initiateCollegeWorkFlow,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        dispatch(
          postInitiateCollegeWorkFlow({ data: response.data, isError: false, isLoading: false })
        );
        return resolve(response);
      })
      .catch((error) => {
        dispatch(postInitiateCollegeWorkFlow({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
