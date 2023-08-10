import successToast from '../ui/core/toaster';

export const expireSession = (msg) => {
  successToast(msg, 'auth-error', 'error', 'top-center');

  const lng = sessionStorage.getItem('lng');
  sessionStorage.clear();
  if (lng) {
    sessionStorage.setItem('lng', lng);
  }
};
