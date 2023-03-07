import { API_HPRID } from '../../api/api-endpoints';
import { accesstokenHprId } from '../../constants/common-data';
import { POST } from '../../constants/requests';
import { hpIdUseAxiosCall } from '../../hooks/use-axios';
import {
  aadhaarNumberData,
  aadhaarOtpDetails,
  typeOfOtp,
} from '../reducers/user-aadhaar-verify-reducer';

export const sendAaadharOtp = (aadhaar) => async (dispatch) => {
  let type = 'aadhaar';
  return await new Promise((resolve, reject) => {
    hpIdUseAxiosCall({
      method: POST,
      url: API_HPRID.hpId.sendAadhaarOtp,
      data: { aadhaar },
      headers: { Authorization: 'Bearer ' + accesstokenHprId },
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
