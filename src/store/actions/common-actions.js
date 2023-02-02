import { API } from '../../api/api-endpoints';
// import { verboseLog } from '../../config/debug';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getCities,
  getCountries,
  getDistricts,
  getRegistrationCouncil,
  getStates,
  getSubDistricts,
  getUniversity,
  sendNotificationData,
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

export const getRegistrationCouncilList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.getCouncilNames,
    })
      .then((response) => {
        dispatch(getRegistrationCouncil(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getUniversityList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.getUniversityNames,
    })
      .then((response) => {
        dispatch(getUniversity(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const sendNotificationOtp = (otpTypeValue) => async (dispatch) => {
  // verboseLog('inside common action', otpTypeValue);
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.sendOtp,
      data: otpTypeValue,
    })
      .then((response) => {
        dispatch(sendNotificationData(response));
        // return resolve(response.DOAuthOTP.uidtkn);
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
      data: otpValue,
    })
      .then((response) => {
        dispatch(verifyNotificationData(response));
        // return resolve(response.DOAuthOTP.uidtkn);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
