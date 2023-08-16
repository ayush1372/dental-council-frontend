import Axios from 'axios';
import sha256 from 'sha256';

import { API } from '../api/api-endpoints';
import authInterceptors from '../api/auth-interceptors';
import { millisecondToDate } from '../helpers/functions/common-functions';
import { logoutAction } from '../store/actions/login-action';
import { logout, resetCommonReducer, setApiLoading } from '../store/reducers/common-reducers';
import store from '../store/store';
import successToast from '../ui/core/toaster';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_V1_API_URL,
});
const hpIdAxios = Axios.create({
  baseURL: process.env.REACT_APP_HPR_REGISTER,
});
const gatewayApi = Axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_SESSION_API,
});

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    // when api getting 401
    if (error.response.status === 401) {
      // const accessToken = localStorage.getItem('userToken');
      if (localStorage.getItem('accesstoken')) {
        const refreshToken = localStorage.getItem('refreshtoken');
        //if refresh token expire logout the user, if not check access token
        if (millisecondToDate(refreshToken) > new Date()) {
          //if access token expire logout the user, if not refresh token api
          // if (new Date() >= millisecondToDate(accessToken)) {
          //refresh token api
          return Axios.post(process.env.REACT_APP_V1_API_URL + API.login.refreshToken, '', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('refreshtoken'),
              apikey: process.env.REACT_APP_API_KEY,
            },
          }).then((response) => {
            localStorage.setItem('accesstoken', response.headers['access-token']);
            localStorage.setItem('refreshtoken', response.headers['refresh-token']);
            //passing updated token in headers for authorization
            error.config.headers['Authorization'] = 'Bearer ' + response.headers['access-token'];
            return axios.request(error.response.config);
          });
        }
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

const setLoadingState = (booleanValue) => store.dispatch(setApiLoading(booleanValue));

const appheader = { 'Content-Type': 'application/json', apikey: process.env.REACT_APP_API_KEY };

const axiosProps = {
  method: 'GET',
  url: '',
  data: {},
  headers: undefined,
  responseType: 'json',
};

export const useAxiosCall = async (payload = axiosProps) => {
  if (payload?.url?.includes('/personal')) {
    setLoadingState(false);
  } else {
    setLoadingState(true);
  }
  payload.headers =
    payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;
  // payload = concatDefaultProps(axiosProps, payload);

  return await new Promise((resolve, reject) => {
    axios(payload)
      .then((response) => {
        if (
          process.env.REACT_APP_CHECKSUM_FLAG === 'true' &&
          response.headers['is-authorized'] !== undefined
        ) {
          const key = sha256(process.env.REACT_APP_CHECKSUM_KEY + JSON.stringify(response?.data));
          if (
            response?.headers &&
            response.headers['is-authorized'] !== undefined &&
            response.headers['is-authorized'] === key
          ) {
            return resolve({
              data: response.data,
              responseHeader: response.headers,
              isLoading: false,
              isError: false,
            });
          } else if (response.headers['is-authorized'] !== key) {
            successToast(
              'An error occurred while processing your request. Please try again in sometime.',
              'auth-error-Network',
              'error',
              'top-center'
            );
            if (localStorage?.getItem('accesstoken')) {
              localStorage.clear();
              store.dispatch(logoutAction());
              store.dispatch(logout());
              store.dispatch(resetCommonReducer());
              window.location.reload();
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }
          }
        } else {
          return resolve({
            data: response.data,
            responseHeader: response.headers,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch((error) => {
        authInterceptors(error);
        return reject({
          data: error,
          isLoading: false,
          isError: true,
        });
      })
      .finally(() => setLoadingState(false));
  });
};
export const hpIdUseAxiosCall = async (payload = axiosProps) => {
  setLoadingState(true);
  payload.headers =
    payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;
  // payload = concatDefaultProps(axiosProps, payload);

  return await new Promise((resolve, reject) => {
    hpIdAxios(payload)
      .then((response) => {
        return resolve({
          data: response.data,
          responseHeader: response.headers,
          isLoading: false,
          isError: false,
        });
      })
      .catch((error) => {
        authInterceptors(error);
        return reject({
          data: error,
          isLoading: false,
          isError: true,
        });
      })
      .finally(() => setLoadingState(false));
  });
};
export const hpIdDemographicUseAxiosCall = async (payload = axiosProps) => {
  setLoadingState(true);
  payload.headers =
    payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;

  return await new Promise((resolve, reject) => {
    hpIdAxios(payload)
      .then((response) => {
        return resolve({
          data: response.data,
          responseHeader: response.headers,
          isLoading: false,
          isError: false,
        });
      })
      .catch((error) => {
        authInterceptors(error);
        return reject({
          data: error,
          isLoading: false,
          isError: true,
        });
      })
      .finally(() => setLoadingState(false));
  });
};
export const gatewayApiUseAxiosCall = async (payload = axiosProps) => {
  setLoadingState(true);
  payload.headers =
    payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;

  return await new Promise((resolve, reject) => {
    gatewayApi(payload)
      .then((response) => {
        return resolve({
          data: response.data,
          responseHeader: response.headers,
          isLoading: false,
          isError: false,
        });
      })
      .catch((error) => {
        authInterceptors(error);
        return reject({
          data: error,
          isLoading: false,
          isError: true,
        });
      })
      .finally(() => setLoadingState(false));
  });
};

export const useAxiosMultipleCall = async ({ requestArray = [axiosProps] }) => {
  setLoadingState(true);
  return await Promise.allSettled(
    requestArray.map(async (payload, index) => {
      payload.headers =
        payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;
      // payload = concatDefaultProps(axiosProps, payload);
      return {
        [`result${index}`]: await new Promise((resolve, reject) => {
          axios(payload)
            .then((response) => {
              // setLoadingState(false);
              return resolve({
                data: response.data,
                isLoading: false,
                isError: false,
              });
            })
            .catch((error) => {
              // setLoadingState(false);
              return reject({
                data: error,
                isLoading: false,
                isError: true,
              });
            });
        }),
      };
    })
  ).finally(() => setLoadingState(false));
};

export const concatDefaultProps = (firstObject, secondObject) => {
  Object.entries(firstObject).map((item) =>
    !(item[0] in secondObject) ? (secondObject[item[0]] = item[1]) : null
  );
  return secondObject;
};
