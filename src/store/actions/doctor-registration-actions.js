import { API, API_HPRID } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { smcRegistrationDetail } from '../reducers/doctor-registration-reducer';

export const fetchSmcRegistrationDetails = (registrationData) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.doctorRegistration.smcRegistrationDetail
        .replace('{smcId}', registrationData?.smcId)
        .replace('{registrationNumber}', registrationData?.registrationNumber),

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
export const checkHpidExists = (hprId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API_HPRID.hp.checkHprIdExists,

      data: hprId,
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
// export const sendResetPasswordLink = (data) => async (dispatch) => {
//   return await new Promise((resolve, reject) => {
//     useAxiosCall({
//       method: POST,
//       url: API.doctorRegistration.passwordLink,
//       data: { data },
//     })
//       .then((response) => {
//         dispatch(sendResetPasswordLink(response));
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

// export const getHprIdSuggestions = () => async (dispatch) => {
//   return await new Promise((resolve, reject) => {
//     hpIdUseAxiosCall({
//       method: GET,
//       url: API_HPR.hpid.hpIdSuggestions,
//       headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
//       // data: txnId,
//     })
//       .then((response) => {
//         dispatch(hprIdSuggestionsData(response));
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

// export const createUniqueHprId = (mobile, otp, txnId) => async (dispatch) => {
//   return await new Promise((resolve, reject) => {
//     hpIdUseAxiosCall({
//       method: POST,
//       url: API_HPR.hpid.createHprId,
//       data: { mobile, otp, txnId },
//     })
//       .then((response) => {
//         dispatch(hprIdData(response));
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };
