import { API } from '../../api/api-endpoints';
import { verboseLog } from '../../config/debug';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';

export const sendAaadharOtp = async () => {
  let aadhaarNumberValue = localStorage.getItem('aadharNumber');

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.Aadhaar.sendAadhaarOtp,
      data: aadhaarNumberValue,
    })
      .then((response) => {
        verboseLog('otp response===>', response);
        localStorage.setItem('transid', response.data.DOAuthOTP.uidtkn);
        return resolve(response);
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
