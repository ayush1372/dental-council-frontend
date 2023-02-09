/* eslint-disable no-console */
import { API, API_HPR } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { hpIdUseAxiosCall, useAxiosCall } from '../../hooks/use-axios';
import {
  hprIdData,
  hprIdSuggestionsData,
  searchByMobileHprId,
  smcRegistrationDetail,
} from '../reducers/doctor-registration-reducer';

export const fetchSmcRegistrationDetails = (registrationData) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.doctorRegistration.smcRegistrationDetail,
      data: registrationData,
    })
      .then((response) => {
        console.log('response', response);
        dispatch(smcRegistrationDetail(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const sendResetPasswordLink = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.resetPasswordLink,
      data: { data },
    })
      .then((response) => {
        dispatch(sendResetPasswordLink(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const searchHpIdByMobileNumber = (mobile) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPR.hpid.searchByMobile,
      data: mobile,
    })
      .then((response) => {
        dispatch(searchByMobileHprId(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getHprIdSuggestions = (txnId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPR.hpid.hpIdSuggestions,
      // headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: txnId,
    })
      .then((response) => {
        dispatch(hprIdSuggestionsData(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const createUniqueHprId = (mobile, otp, txnId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPR.hpid.createHprId,
      data: { mobile, otp, txnId },
    })
      .then((response) => {
        dispatch(hprIdData(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
