export const expireSession = (msg = 'Session Expired!') => {
  window.location.href = '/';
  alert(msg);
  const lng = localStorage.getItem('lng');
  localStorage.clear();
  if (lng) {
    localStorage.setItem('lng', lng);
  }
};
