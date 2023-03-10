/* eslint-disable no-console */
import { API_HPRID } from '../../api/api-endpoints';
import { accesstokenHprId } from '../../constants/common-data';
import { POST } from '../../constants/requests';
import { hpIdUseAxiosCall } from '../../hooks/use-axios';
import {
  aadhaarNumberData,
  aadhaarOtpDetails,
  demographicAuthMobileDetails,
  typeOfOtp,
} from '../reducers/user-aadhaar-verify-reducer';

export const sendAaadharOtp = (aadhaar) => async (dispatch) => {
  console.log('cyro1', aadhaar);
  let type = 'aadhaar';
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.sendAadhaarOtp,
      data: { aadhaar },
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
    })
      .then((response) => {
        console.log('cyro2');
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
  console.log('getDemographicAuthMobile', data);
  // let type = 'aadhaar';
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.demographicAuthMobile,
      data: data,
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
    })
      .then((response) => {
        console.log('camel', response.data.verified);
        dispatch(demographicAuthMobileDetails(response));

        // dispatch(aadhaarNumberData(response));
        // dispatch(typeOfOtp(type));

        // return resolve(response);
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
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
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
