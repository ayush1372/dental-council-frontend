import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { aadhaarNumberData } from '../reducers/user-aadhaar-verify-reducer';

export const sendAaadharOtp = (aadhaarNumber) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.sendAadhaarOtp,
      data: { aadhaarNumber },
    })
      .then((response) => {
        dispatch(aadhaarNumberData(response));
        return resolve(response.DOAuthOTP.uidtkn);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const validateOtpAadhaar = async (dataValues) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.verifyAadhaarOtp,
      data: dataValues,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
