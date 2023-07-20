/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

// import { ErrorMessages } from '../constants/error-messages';
// import { expireSession } from '../helpers/components/session';
import successToast from '../ui/core/toaster';

const authInterceptors = (error) => {
  const allFailMsg = 'Unexpected error occurred. Please try again in sometime.';
  if (error && error?.response) {
    if (error?.response?.status) {
      if (error?.response?.status >= 500) {
        successToast(allFailMsg, 'auth-error', 'error', 'top-center');
        return Promise.reject(allFailMsg);
      } else if (error?.response?.status < 500) {
        let data = error?.response?.data;

        if (data?.message === 'Network Error') {
          successToast(allFailMsg, 'auth-error-Network', 'error', 'top-center');
          return Promise.reject(allFailMsg);
        }

        successToast(data?.message, 'auth-error-Network', 'error', 'top-center');
        return Promise.reject(data?.message);
      }
    } else if (error?.message && error?.message.includes('Network')) {
      successToast(allFailMsg, 'auth-error-Network', 'error', 'top-center');
      return Promise.reject(allFailMsg);
    }
  } else {
    successToast(allFailMsg, 'auth-error', 'error', 'top-center');
    return Promise.reject(allFailMsg);
  }
};

export default authInterceptors;
