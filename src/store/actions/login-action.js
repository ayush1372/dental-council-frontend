import { API } from '../../api/api-endpoints';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  generateCaptcha,
  getCaptchaEnabledFlag,
  loginUser,
  refreshTokenApi,
  validateCaptcha,
} from '../reducers/login-reducer';

const captchaGenerator = () => {
  var num1 = Math.floor(Math.random() * 9) + 1;
  var num2 = Math.floor(Math.random() * 9) + 1;

  var operations = ['+', '-', '*'];
  var operation = operations[Math.floor(Math.random() * operations.length)];
  if (operation === '-' && num1 < num2) {
    var temp = num1;
    num1 = num2;
    num2 = temp;
  }

  var result;
  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
  }

  return {
    expression: num1 + ' ' + operation + ' ' + num2,
    result: result,
  };
};

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
  try {
    const captcha = captchaGenerator();
    dispatch(generateCaptcha(captcha));
    return captcha;
  } catch (error) {
    console.error('Error generating captcha:', error);
    throw error;
  }
};

export const validateCaptchaImage = (body) => async (dispatch) => {
  return body?.transaction_id === body?.result;
};

// export const generateCaptchaImage2 = () => async (dispatch) => {
//   return await new Promise((resolve, reject) => {
//     useAxiosCall({
//       method: GET,
//       url: API.login.generateCaptcha,
//     })
//       .then((response) => {
//         dispatch(generateCaptcha(response.data));
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

// export const validateCaptchaImage2 = (body) => async (dispatch) => {
//   return await new Promise((resolve, reject) => {
//     useAxiosCall({
//       method: POST,
//       url: API.login.validateCaptcha,
//       data: body,
//     })
//       .then((response) => {
//         dispatch(validateCaptcha(response.data));
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

export const loginAction = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.login.loginUser,
      data: body,
    })
      .then((response) => {
        dispatch(loginUser(response));
        JSON.stringify(
          localStorage.setItem('accesstoken', response.responseHeader['access-token'])
        );
        JSON.stringify(
          localStorage.setItem('refreshtoken', response.responseHeader['refresh-token'])
        );
        JSON.stringify(localStorage.setItem('userSubTypeID', response.data['user_sub_type']));
        JSON.stringify(localStorage.setItem('collegeID', response.data['college_id']));
        JSON.stringify(
          localStorage.setItem('HPProfileStatusID', response.data['hp_profile_status_id'])
        );
        JSON.stringify(
          localStorage.setItem('workProfileStatusID', response.data['work_flow_status_id'])
        );
        JSON.stringify(localStorage.setItem('esignStatus', response.data['esign_status']));
        JSON.stringify(localStorage.setItem('SuspendedStatus', response.data['Suspended']));
        JSON.stringify(localStorage.setItem('userType', response.data['user_type']));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const refreshTokenAction = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.login.refreshToken,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('refreshtoken') },
    })
      .then((response) => {
        dispatch(refreshTokenApi(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const logoutAction = () => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.login.logoutUser,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
