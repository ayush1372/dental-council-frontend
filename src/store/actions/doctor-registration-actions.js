import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getSmcRegistrationDetails } from '../reducers/doctor-registration-reducer';

export const fetchSmcRegistrationDetails = (registrationData) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.doctorRegistration.smcRegistrationDetail,
      data: registrationData,
    })
      .then((response) => {
        dispatch(getSmcRegistrationDetails(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
