import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getForgotPassword } from '../reducers/forgot-password-reducer';

export const forgotPassword = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.forgotPassword.doctor,
      data: data,
    })
      .then((response) => {
        dispatch(getForgotPassword(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
