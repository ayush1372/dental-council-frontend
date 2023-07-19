/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
import i18next from 'i18next';

import { ErrorMessages } from '../constants/error-messages';
import { expireSession } from '../helpers/components/session';
import successToast from '../ui/core/toaster';

const authInterceptors = (error) => {
  const allFailMsg = ErrorMessages?.apiServerFail;
  if (error && error?.response) {
    if (error?.response?.status || error?.response?.status !== 401) {
      if (error?.response?.status >= 500) {
        successToast(i18next.t(allFailMsg), 'auth-error', 'error', 'top-center');
        return Promise.reject(allFailMsg);
      } else if (error?.response?.status < 500) {
        let data = error?.response?.data;

        // to handle invalid token
        if (error?.response?.status === 400) {
          // let object = error?.response?.data;
          // if (
          //   object.message === 'Invalid X-token' ||
          //   object.message === 'Invalid F-Token' ||
          //   object?.message === 'Invalid T-token'
          // ) {
          //   //if t-token is expired handle in there own component
          //   if (object?.message === 'Invalid T-token') {
          //     return Promise.reject('ErrorMessages?.apiServerFail');
          //   } else if (object?.message !== 'Invalid T-token') {
          //     expireSession();
          //     window.location.reload();
          //     return Promise.reject(ErrorMessages?.apiServerFail);
          //   }
          // } else {
          //   let keys = Object.keys(object);
          //   for (let key of keys) {
          //     if (key !== 'timestamp') {
          //       successToast(
          //         i18next.t(error?.response?.data[key]),
          //         'auth-error-Network',
          //         'error',
          //         'top-center'
          //       );
          //       return Promise.reject(error?.response?.data[key]);
          //     }
          //   }
          // }
        }
        if (error?.message && error?.message === 'Network Error') {
          successToast(i18next.t(allFailMsg), 'auth-error-Network', 'error', 'top-center');
          return Promise.reject(allFailMsg);
        } // if Invalid Transaction Id
        else if (data?.code === 'ABDM-1017') {
          successToast(
            i18next.t(ErrorMessages.emInvalidTransactionId),
            'auth-error-Network',
            'error',
            'top-center'
          );
          return Promise.reject(data?.code);
        } //if abha user not found after login
        else if (data?.code === 'ABDM-1114' && localStorage.getItem('userToken')) {
          expireSession();
          window.location.reload();
          return Promise.reject(data?.code);
        } // if abha account is deactivated handle in there own component
        else if (data?.code !== 'ABDM-1122') {
          let errorSplit = data?.message?.split(':')[data?.message?.split(':').length - 1]?.trim();
          successToast(i18next.t(errorSplit), 'auth-error-Network', 'error', 'top-center');
          return Promise.reject(errorSplit);
        }
      }
    } else if (error?.message && error?.message.includes('Network')) {
      successToast(i18next.t(allFailMsg), 'auth-error-Network', 'error', 'top-center');
      return Promise.reject(allFailMsg);
    }
  } else if (
    error &&
    error?.status === 200 &&
    error &&
    error.data?.authResult?.toUpperCase() === 'FAILED'
  ) {
    successToast(i18next.t(error?.data?.message), 'auth-error', 'error', 'top-center');
    return Promise.reject(error?.data?.message);
  } else {
    successToast(i18next.t(allFailMsg), 'auth-error', 'error', 'top-center');
    return Promise.reject(allFailMsg);
  }
};

export default authInterceptors;
