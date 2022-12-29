import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { generateCaptcha, getCaptchaEnabledFlag } from '../reducers/login-reducer';

export const getCaptchaEnabledFlagValue = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.login.getCaptchaEnabledFlag,
    })
      .then((response) => {
        dispatch(getCaptchaEnabledFlag(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const generateCaptchaImage = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.login.generateCaptcha,
    })
      .then((response) => {
        dispatch(generateCaptcha(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
