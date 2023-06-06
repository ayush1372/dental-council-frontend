/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import successToast from '../ui/core/toaster';
import { expireSession } from './session';

const capitalizeFirstLetter = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const authInterceptors = (error) => {
  const allFailMsg =
    'System encountered an unexpected request failure. Please try again in sometime.';

  if (error && error?.response) {
    if (error?.response?.status && error?.response?.status === 401) {
      let data = error?.response?.data;
      if (
        data?.details &&
        data?.details.length > 0 &&
        data?.details[0] &&
        data?.details[0].message
      ) {
        if (data?.details[0]?.attribute && data?.details[0]?.attribute.key) {
          successToast(
            `${capitalizeFirstLetter(data?.details[0]?.attribute?.key)}: ${
              data.details[0].message
            }`,
            'auth-error',
            'error',
            'top-center'
          );
          return Promise.reject(error?.response?.data);
        } else {
          successToast(data?.details[0]?.message, 'auth-error', 'error', 'top-center');
          return Promise.reject(error?.response?.data);
        }
      } else {
        // expireSession("ERR_SESSION: Session error. Please clear cache or use private/incognito window.");
        expireSession(error?.response?.data?.message);
        return Promise.reject(error?.response);
      }
    } else if (error?.response?.status >= 500) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    } else if (error?.response?.data) {
      let data = error?.response?.data;
      if (
        data?.details &&
        data?.details?.length > 0 &&
        data?.details[0] &&
        data?.details[0].message
      ) {
        if (data?.details[0]?.attribute && data?.details[0]?.attribute.key) {
          if (data.details[0].attribute.key === 'mobile') {
            successToast(data.details[0].message, 'auth-error', 'error', 'top-center');
          } else {
            successToast(
              `${capitalizeFirstLetter(data.details[0].attribute.key)}: ${
                data?.details[0]?.message
              }`,
              'auth-error',
              'error',
              'top-center'
            );
          }

          return Promise.reject(error?.response?.data);
        } else {
          successToast(data?.details[0]?.message, 'auth-error', 'error', 'top-center');
          return Promise.reject(error?.response?.data);
        }
      } else {
        successToast(data?.Message, 'auth-error-Network', 'error', 'top-center');
        return Promise?.reject(error?.response?.data || error, 'auth-error', 'error', 'top-center');
      }
    }
  } else if (error?.message && error?.message.includes('Network')) {
    return successToast(
      'ERR_CONN: Error while connecting to server. Please check that your internet connection is working.'
    );
  } else {
    successToast('ERR_UNA: ' + allFailMsg, 'auth-error-Network', 'error', 'top-center');
    return Promise.reject('ERR_UNA: ' + allFailMsg);
  }
};

export default authInterceptors;
