import { API, API_HPRID } from '../../api/api-endpoints';
import { accesstokenHprId } from '../../constants/common-data';
import { GET, POST } from '../../constants/requests';
import { gatewayApiUseAxiosCall, hpIdUseAxiosCall, useAxiosCall } from '../../hooks/use-axios';
import {
  getAccessToken,
  getkycDetails,
  getMobileOtp,
  hpIdExistsDetails,
  hprIdSuggestionsDetails,
  sendResetPasswordLinkDetails,
  setUserPasswordData,
  smcRegistrationDetail,
  storeMobileDetails,
} from '../reducers/doctor-registration-reducer';
import { typeOfOtp } from '../reducers/user-aadhaar-verify-reducer';

export const fetchSmcRegistrationDetails = (registrationData) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.doctorRegistration.smcRegistrationDetail
        .replace('{smcId}', registrationData?.smcId)
        .replace('{registrationNumber}', registrationData?.registrationNumber),
      headers: { 'Content-Type': 'application/json' },
      data: registrationData,
    })
      .then((response) => {
        dispatch(smcRegistrationDetail(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getSessionAccessToken = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    gatewayApiUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.sessionApi,
      data: body,
    })
      .then((response) => {
        dispatch(getAccessToken(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const checkKycDetails = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.kyc.kycCheck.replace('{registrationNumber}', body.registrationNumber),
      data: body,
    })
      .then((response) => {
        dispatch(getkycDetails(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const generateMobileOtp = (body) => async (dispatch) => {
  let type = 'mobile';
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.generateMobileOtp,
      data: body,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
    })
      .then((response) => {
        dispatch(getMobileOtp(response));
        dispatch(storeMobileDetails(body));
        dispatch(typeOfOtp(type));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const verifyMobileOtp = (body) => async () => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.verifyMobileOtp,
      data: body,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const checkHpidExists = (txnId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.checkHprIdExists,
      data: txnId,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
    })
      .then((response) => {
        dispatch(hpIdExistsDetails(response));

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
      url: API_HPRID.hpId.hpIdSuggestion,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
      data: txnId,
    })
      .then((response) => {
        dispatch(hprIdSuggestionsDetails(response));
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
      url: API.doctorRegistration.passwordLink,
      data: data,
    })
      .then((response) => {
        dispatch(sendResetPasswordLinkDetails(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const createUniqueHprId = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.createHprId,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
      data: data,
    })
      .then((response) => {
        dispatch(hpIdExistsDetails(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const setUserPassword = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.doctorRegistration.setUserPassword,
      // headers: { Authorization: 'Bearer ' + accesstokenHprId },
      data: data,
    })
      .then((response) => {
        dispatch(setUserPasswordData(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
