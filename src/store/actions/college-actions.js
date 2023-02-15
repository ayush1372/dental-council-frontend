import { API } from '../../api/api-endpoints';
import { GET, PATCH, POST, PUT } from '../../constants/requests';
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
  const endpoint = API.college.getCollegeRegistrarProfile.replace('{id}', id);
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: endpoint.replace('{collegeId}', id),
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
  const endpoint = API.college.getCollegeDeanProfile.replace('{id}', id);
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: endpoint.replace('{collegeId}', id),
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

export const sendRegistrarDetails = (details, collegeId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.registrar.replace('{collegeId}', collegeId),
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: details,
    })
      .then((response) => {
        dispatch(detailsOfRegistrar(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const sendDeanDetails = (details, collegeID) => async (dispatch) => {
  let id = null;
  let name = details.deanName;
  let phone_number = details.deanPhoneNumber;
  let email_id = details.deanEmail;
  let user_id = null;
  let password = details.deanPassword;

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.dean.replace('{collegeId}', collegeID),
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
      url: API.college.register + '/' + body?.id,
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

export const updateCollegeDeanData = (body) => async () => {
  const endpoint = API.college.getCollegeDeanProfile.replace('{id}', body?.id);

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: endpoint.replace('{collegeId}', body?.id),
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
      method: PATCH,
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
