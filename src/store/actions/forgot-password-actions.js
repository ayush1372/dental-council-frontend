import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getForgotPassword } from '../reducers/forgot-password-reducer';

export const setPassword = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.forgotPassword.setPassword,
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

export const forgotPassword = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.forgotPassword.reSetPassword,
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
