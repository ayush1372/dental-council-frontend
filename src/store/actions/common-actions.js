import { API } from '../../api/api-endpoints';
import { GET, PATCH, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getActivateLicense,
  getCities,
  getColleges,
  getCountries,
  getCourses,
  getDistricts,
  getLanguages,
  getSpecialities,
  getStates,
  getSubDistricts,
  getUniversities,
  searchTrackStatusData,
  sendNotificationData,
  setNewPassword,
  updateCouncilNames,
  verifyNotificationData,
} from '../reducers/common-reducers';

export const getStatesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.states,
    })
      .then((response) => {
        dispatch(getStates(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getSubDistrictsList = (districtId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.subDistricts.replace('{district_id}', districtId),
    })
      .then((response) => {
        dispatch(getSubDistricts(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCountriesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.countries,
    })
      .then((response) => {
        dispatch(getCountries(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getDistrictList = (stateId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.districts.replace('{state_id}', stateId),
    })
      .then((response) => {
        dispatch(getDistricts(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getLanguagesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.languages,
    })
      .then((response) => {
        dispatch(getLanguages(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getUniversitiesList = (selectedCollegeID) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.universities}?collegeId=${selectedCollegeID}`,
    })
      .then((response) => {
        dispatch(getUniversities(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCoursesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.courses,
    })
      .then((response) => {
        dispatch(getCourses(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCollegesList = (selectedState) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.colleges}?stateId=${selectedState}`,
    })
      .then((response) => {
        dispatch(getColleges(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getSpecialitiesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.specialities,
    })
      .then((response) => {
        dispatch(getSpecialities(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getRegistrationCouncilList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.councilNames,
    })
      .then((response) => {
        dispatch(updateCouncilNames(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getCitiesList = (sub_district_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.cities.replace('{sub_district_id}', sub_district_id),
    })
      .then((response) => {
        dispatch(getCities(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const sendNotificationOtp = (otpTypeValue) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.sendOtp,
      data: otpTypeValue,
    })
      .then((response) => {
        dispatch(sendNotificationData(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const verifyNotificationOtp = (otpValue) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.verifyOtp,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: otpValue,
    })
      .then((response) => {
        dispatch(verifyNotificationData(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const trackStatus = (trackData) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.trackStatus}?smcId=${trackData.smcId}&registrationNo=${trackData.registrationNo}&pageNo=${trackData.pageNo}&offset=${trackData.offset}&sortBy=${trackData.sortBy}&sortType=${trackData.sortType}`,
    })
      .then((response) => {
        dispatch(searchTrackStatusData(response));
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getInitiateWorkFlow = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PATCH,
      url: API.DoctorUserProfileData.initiateWorkFlow,
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const changePasswordData = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.changePassword,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: data,
    })
      .then((response) => {
        dispatch(setNewPassword(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getActivateLicenseList = (body) => async (dispatch) => {
  let path = '';
  if (body.search !== undefined && body.search !== null && body.search !== '') {
    if (path === '') {
      path += 'search=' + body.search;
    } else {
      path += '&search=' + body.search;
    }
  }
  if (body.value !== undefined && body.value !== null && body.value !== '') {
    if (path === '') {
      path += 'value=' + body.value;
    } else {
      path += '&value=' + body.value;
    }
  }

  if (body.pageNo !== undefined && body.pageNo !== null && body.pageNo !== '') {
    path += '&pageNo=' + body.pageNo;
  }
  if (body.offset !== undefined && body.offset !== null && body.offset !== '') {
    path += '&offset=' + body.offset;
  }
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.activateLicense}?${path}`,
    })
      .then((response) => {
        dispatch(getActivateLicense(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const createReActivateLicense = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.activateLicense,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const reActivateLicenseStatus = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PATCH,
      url: API.common.healthProfessionalApplicationStatus,
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const suspendDoctor = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.suspend,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const enableUserNotification = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.common.enableNotification,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

//To get the Complete Address while entering postal Code.
export const getPostalAddress = (postalID) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.LGDService + postalID,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
