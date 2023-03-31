import successToast from '../ui/core/toaster';

export const expireSession = (msg) => {
  successToast(msg, 'auth-error', 'error', 'top-center');

  const lng = localStorage.getItem('lng');
  localStorage.clear();
  if (lng) {
    localStorage.setItem('lng', lng);
  }
};
