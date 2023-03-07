import successToast from '../ui/core/toaster';

export const expireSession = (msg = 'Session Expired!') => {
  successToast(msg, 'auth-error', 'error', 'top-center');
  setTimeout(() => {
    window.location.href = '/';
  }, 500);

  const lng = localStorage.getItem('lng');
  localStorage.clear();
  if (lng) {
    localStorage.setItem('lng', lng);
  }
};
