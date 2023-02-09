import Axios from 'axios';

import authInterceptors from '../api/auth-interceptors';
import { setApiLoading } from '../store/reducers/common-reducers';
import store from '../store/store';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_V1_API_URL,
  // timeout: 3000,
});
const hpIdAxios = Axios.create({
  baseURL: process.env.REACT_APP_HPR_REGISTER,
});

const setLoadingState = (booleanValue) => store.dispatch(setApiLoading(booleanValue));

const appheader = { 'Content-Type': 'application/json' };

const axiosProps = {
  method: 'GET',
  url: '',
  data: {},
  headers: undefined,
  responseType: 'json',
};

export const useAxiosCall = async (payload = axiosProps) => {
  setLoadingState(true);
  payload.headers =
    payload.headers !== undefined ? Object.assign(payload.headers, appheader) : appheader;
  // payload = concatDefaultProps(axiosProps, payload);

  return await new Promise((resolve, reject) => {
    axios(payload)
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
