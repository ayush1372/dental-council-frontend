import { API } from '../../api/api-endpoints';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  generateCaptcha,
  getCaptchaEnabledFlag,
  loginUser,
  validateCaptcha,
} from '../reducers/login-reducer';

export const getCaptchaEnabledFlagValue = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.login.getCaptchaEnabledFlag,
    })
      .then((response) => {
        dispatch(getCaptchaEnabledFlag({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCaptchaEnabledFlag({ data: [], isError: true, isLoading: false }));
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

export const validateCaptchaImage = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.login.validateCaptcha,
      data: body,
    })
      .then((response) => {
        dispatch(validateCaptcha(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const loginAction = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.login.loginUser,
      data: body,
    })
      .then((response) => {
        dispatch(loginUser(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
