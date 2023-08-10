import { API } from '../../api/api-endpoints';
import { GET, PATCH, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  collegeAdminVerifier,
  collegeProfile,
  collegeRegister,
  detailsOfDean,
  detailsOfRegistrar,
  getCollegeAdminData,
  getCollegeAdminDesignation,
  getCollegeDeanData,
  getCollegeRegistrarData,
  // updateCollegeAdminProfile
  postInitiateCollegeWorkFlow,
  registerCollege,
  updateCollege,
} from '../reducers/college-reducer';

export const getCollegeAdminProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeProfile.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

export const getCollegeRegistrarProfileData = (parentID, id) => async (dispatch) => {
  const endpoint = API.college.getCollegeRegistrarProfile.replace('{collegeId}', parentID);
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: endpoint.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

export const getCollegeDeanProfileData = (parentID, id) => async (dispatch) => {
  const endpoint = API.college.getCollegeDeanProfile.replace('{collegeId}', parentID);
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: endpoint.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      url: API.common.college.replace('{id}', body?.id),
      data: body,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateCollegeRegistrarData = (body, collegeId, verifierId) => async () => {
  const endpoint = API.college.collegeProfile.replace('{collegeId}', collegeId);

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: endpoint.replace('{verifierId}', verifierId),
      data: body,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
export const updateCollegeDetail = (collegeDetails) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.common.college.replace('{id}', collegeDetails.id),

      data: collegeDetails,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(updateCollege(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const registerCollegeDetail = (collegeDetails) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.allColleges,
      data: collegeDetails,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(registerCollege(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const collegeProfileData = (collegeId, verifierId) => async (dispatch) => {
  const endpoint = API.college.collegeProfile.replace('{collegeId}', collegeId);

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: endpoint.replace('{verifierId}', verifierId),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        if (response?.data?.designation === 1) {
          dispatch(getCollegeAdminData({ data: response.data, isError: false, isLoading: false }));
        } else if (response?.data?.designation === 2) {
          dispatch(
            getCollegeRegistrarData({ data: response.data, isError: false, isLoading: false })
          );
        } else if (response?.data?.designation === 3) {
          dispatch(getCollegeDeanData({ data: response.data, isError: false, isLoading: false }));
        } else {
          dispatch(collegeProfile(response));
        }
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

export const getAdminDesignation = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.admindesignation,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeAdminDesignation(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getAdminVerifier = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.adminVerifier.replace('{collegeId}', body?.college_id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        dispatch(collegeAdminVerifier(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
