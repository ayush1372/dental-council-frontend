import debug from 'debug';

const log = debug('data:application');

function setStorage() {
  sessionStorage.setItem('debug', 'data:application');
}

export function verboseLog(componentName, param) {
  process.env.NODE_ENV === 'development' && setStorage();
  log(componentName, param);
}

export function CustomDebugLog(CustomForm, Values) {
  process.env.NODE_ENV === 'development' && setStorage();
  log(CustomForm, Values);
}
