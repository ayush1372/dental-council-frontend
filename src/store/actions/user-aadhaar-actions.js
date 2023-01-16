import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { aadhaarNumberData } from '../reducers/user-aadhaar-verify-reducer';

export const sendAaadharOtp = (aadhaarNumberValue) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.sendAadhaarOtp,
      data: aadhaarNumberValue,
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
export const validateOtpAadhaar = async (aadhaarNumber, txnId, otp) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.verifyAadhaarOtp,
      data: { aadhaarNumber, txnId, otp },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
