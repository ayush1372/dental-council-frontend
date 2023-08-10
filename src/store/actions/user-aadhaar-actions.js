import { API_HPRID } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { hpIdDemographicUseAxiosCall, hpIdUseAxiosCall } from '../../hooks/use-axios';
import {
  aadhaarNumberData,
  aadhaarOtpDetails,
  demographicAuthMobileDetails,
  typeOfOtp,
} from '../reducers/user-aadhaar-verify-reducer';

export const sendAaadharOtp = (aadhaar) => async (dispatch) => {
  let type = 'aadhaar';
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.sendAadhaarOtp,
      data: { aadhaar },
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('hpridaccesstoken') },
    })
      .then((response) => {
        dispatch(aadhaarNumberData(response));
        dispatch(typeOfOtp(type));

        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getDemographicAuthMobile = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdDemographicUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.demographicAuthMobile,
      data: data,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('hpridaccesstoken') },
    })
      .then((response) => {
        dispatch(demographicAuthMobileDetails(response));
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const validateOtpAadhaar = (dataValues) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.verifyAadhaarOtp,
      data: dataValues,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('hpridaccesstoken') },
    })
      .then((response) => {
        dispatch(aadhaarOtpDetails(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
