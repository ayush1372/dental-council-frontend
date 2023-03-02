import { API } from '../../api/api-endpoints';
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
