/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

// import { ErrorMessages } from '../constants/error-messages';
// import { expireSession } from '../helpers/components/session';
import successToast from '../ui/core/toaster';

const authInterceptors = (error) => {
  const allFailMsg = 'Unexpected error occurred. Please try again in sometime.';
  if (error && error?.response) {
    if (error?.response?.status) {
      if (error?.response?.status >= 500) {
        successToast(
          error?.response?.data?.message ? error?.response?.data?.message : allFailMsg,
          'auth-error',
          'error',
          'top-center'
        );
        return Promise.reject(
          error?.response?.data?.message ? error?.response?.data?.message : allFailMsg
        );
      } else if (error?.response?.status < 500) {
        let data = error?.response?.data;

        if (data?.message === 'Network Error') {
          successToast(allFailMsg, 'auth-error-Network', 'error', 'top-center');
          return Promise.reject(allFailMsg);
        }

        if (data?.path === '/health-professional' && data?.code === 'ABDM-NMR-003') {
          return Promise.reject(data?.message);
        }
        if (
          data?.details &&
          data?.details[0] &&
          data?.details[0]?.code === 'HIS-2011' &&
          data?.details[0]?.message === '“Pi” (basic) attributes of demographic data did not match.'
        ) {
          return Promise.reject(data?.message);
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
