import { API } from '../../api/api-endpoints';
import { GET, PATCH, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getActivateLicense,
  getAllColleges,
  getCities,
  getCollegeDetail,
  getColleges,
  getCountries,
  getCourses,
  getDistricts,
  getLanguages,
  getReactivationData,
  getSpecialities,
  getStates,
  getSubDistricts,
  getUniversities,
  searchTrackStatusData,
  sendNotificationData,
  setNewPassword,
  updateCollegeDetail,
  updateCouncilNames,
  verifyNotificationData,
} from '../reducers/common-reducers';
import { getRaiseQueryData } from '../reducers/raise-query-reducer';

export const getStatesList = (countryId) => async (dispatch) => {
  let id = countryId !== undefined ? countryId : 356;
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.states.replace('356', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
  let path = '';
  if (selectedCollegeID !== undefined && selectedCollegeID !== null && selectedCollegeID !== '') {
    path += 'collegeId=' + selectedCollegeID;
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.universities}?${path}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
  let path = '';
  if (selectedState !== undefined && selectedState !== null && selectedState !== '') {
    path = '?stateId=' + selectedState;
  }
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.colleges}${path}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
export const getAllCollegesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.allColleges}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getAllColleges(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getCollegeData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.college.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeDetail(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateCollegeData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.common.college.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(updateCollegeDetail(response.data));
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
  let path = '';
  if (trackData.smcId !== undefined && trackData.smcId !== null && trackData.smcId !== '') {
    if (path === '') {
      path += 'smcId=' + trackData.smcId;
    } else {
      path += '&smcId=' + trackData.smcId;
    }
  }
  if (
    trackData.registrationNo !== undefined &&
    trackData.registrationNo !== null &&
    trackData.registrationNo !== ''
  ) {
    if (path === '') {
      path += 'registrationNo=' + trackData.registrationNo;
    } else {
      path += '&registrationNo=' + trackData.registrationNo;
    }
  }
  if (trackData.search !== undefined && trackData.search !== null && trackData.search !== '') {
    if (path === '') {
      path += 'search=' + trackData.search;
    } else {
      path += '&search=' + trackData.search;
    }
  }
  if (trackData.value !== undefined && trackData.value !== null && trackData.value !== '') {
    if (path === '') {
      path += 'value=' + trackData.value;
    } else {
      path += '&value=' + trackData.value;
    }
  }

  if (trackData.pageNo !== undefined && trackData.pageNo !== null && trackData.pageNo !== '') {
    if (path === '') {
      path += 'pageNo=' + trackData.pageNo;
    } else {
      path += '&pageNo=' + trackData.pageNo;
    }
  }
  if (trackData.offset !== undefined && trackData.offset !== null && trackData.offset !== '') {
    if (path === '') {
      path += 'offset=' + trackData.offset;
    } else {
      path += '&offset=' + trackData.offset;
    }
  }
  if (trackData.sortBy !== undefined && trackData.sortBy !== null && trackData.sortBy !== '') {
    if (path === '') {
      path += 'sortBy=' + trackData.sortBy;
    } else {
      path += '&sortBy=' + trackData.sortBy;
    }
  }
  if (
    trackData.sortOrder !== undefined &&
    trackData.sortOrder !== null &&
    trackData.sortOrder !== ''
  ) {
    if (path === '') {
      path += 'sortOrder=' + trackData.sortOrder;
    } else {
      path += '&sortOrder=' + trackData.sortOrder;
    }
  }
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.trackStatus}?${path}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
    if (path === '') {
      path += 'pageNo=' + body.pageNo;
    } else {
      path += '&pageNo=' + body.pageNo;
    }
  }
  if (body.offset !== undefined && body.offset !== null && body.offset !== '') {
    if (path === '') {
      path += 'offset=' + body.offset;
    } else {
      path += '&offset=' + body.offset;
    }
  }
  if (body.sortBy !== undefined && body.sortBy !== null && body.sortBy !== '') {
    if (path === '') {
      path += 'sortBy=' + body.sortBy;
    } else {
      path += '&sortBy=' + body.sortBy;
    }
  }
  if (body.sortOrder !== undefined && body.sortOrder !== null && body.sortOrder !== '') {
    if (path === '') {
      path += 'sortOrder=' + body.sortOrder;
    } else {
      path += '&sortOrder=' + body.sortOrder;
    }
  }
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.activateLicense}?${path}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

export const createReActivateLicense = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.activateLicense,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        dispatch(getReactivationData(response));
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

export const suspendDoctor = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.suspend,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

//To Raise the query for the profile.
export const raiseQuery = (body) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.queryRaise,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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

//To Get the details of raised query for the doctor profile.
export const getRaisedQuery = (profileID) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.raisedQuery.replace('{healthProfessionalId}', profileID),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getRaiseQueryData({ raisedQueryData: response?.data }));
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
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
