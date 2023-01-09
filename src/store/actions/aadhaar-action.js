import { API } from '../../api/api-endpoints';
import { verboseLog } from '../../config/debug';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { userTxId } from '../reducers/aaadhaar-tnxid-reducer';

export const sendAaadharOtp = async (aadhaarNumberValue, dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.sendAadhaarOtp,
      data: aadhaarNumberValue,
    })
      .then((response) => {
        dispatch(userTxId());
        // verboseLog('otp response===>', response);
        // localStorage.setItem('transid', response.data.DOAuthOTP.uidtkn);
        return response.DOAuthOTP.uidtkn;
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const validateOtpAadhaar = async () => {
  const aadhaarNumber = localStorage.getItem('aadharNumber');
  const txnId = localStorage.getItem('transid');
  const otp = localStorage.getItem('otp');

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.verifyAadhaarOtp,
      data: { aadhaarNumber, txnId, otp },
    })
      .then((response) => {
        verboseLog('otp response===>', response);
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
