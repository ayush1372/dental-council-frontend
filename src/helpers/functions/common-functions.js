import JSEncrypt from 'jsencrypt';

import {
  colgDeanRegTabs,
  colgTabs,
  doctorTabs,
  nbeTabs,
  nmcTabs,
  smcTabs,
} from '../components/sidebar-drawer-list-item';

export function dateFormat(s) {
  var b = s.split(/\D/);
  return b.reverse().join('-');
}
export function base64ToBlob(base64, type = 'application/octet-stream') {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type });
}
export function get_year_data(startYear = 1900) {
  var ans = [];
  var date = new Date();
  var presentYear = date.getFullYear();
  for (var i = startYear; i <= presentYear; i++) {
    var entry_struct = {};
    entry_struct['value'] = i.toString();
    entry_struct['label'] = i;
    ans.push(entry_struct);
  }
  ans.reverse();
  return ans;
}
export function year_data(startYear = 1900) {
  var ans = [];
  var date = new Date();
  var presentYear = date.getFullYear();
  for (var i = startYear; i <= presentYear; i++) {
    var entry_struct = {};
    entry_struct['name'] = i.toString();
    entry_struct['id'] = i;
    ans.push(entry_struct);
  }
  ans.reverse();
  return ans;
}

export const capitalize = (stringValue) => {
  if (stringValue === 'undefined' || stringValue === null || stringValue === '') {
    return '';
  } else {
    return (
      stringValue?.length > 0 && stringValue[0].toUpperCase() + stringValue.slice(1).toLowerCase()
    );
  }
};

export const toUpperCase = (str) => {
  const words = str.split(' ');
  const toUpperCase = words.map((word) => word.toUpperCase());
  const result = toUpperCase.join(' ');
  return result;
};

export const capitalizeFirstLetter = (str) => {
  let words = str?.split(' ');

  for (let i = 0; i < words?.length; i++) {
    const firstLetter = words[i][0].toUpperCase();
    let restOfWord = words[i].substr(1).toLowerCase();
    words[i] = firstLetter + restOfWord;
  }
  return words?.join(' ');
};

export const createSelectFieldData = (arrayOfStrings, valueKey) => {
  let updatedValueKey = valueKey !== undefined ? valueKey : 'id';
  if (arrayOfStrings && arrayOfStrings.length > 0) {
    return arrayOfStrings?.map((item) => ({
      label: item?.name,
      value: item[updatedValueKey],
    }));
  } else {
    return [];
  }
};
export const createEditFieldData = (arrayOfStrings, valueKey = 'id') => {
  if (arrayOfStrings && arrayOfStrings.length > 0) {
    return arrayOfStrings?.map((item) => ({
      name: item?.name,
      id: item[valueKey],
    }));
  } else {
    return [];
  }
};

export const changeAppFontSize = (size, appFontType) => {
  const fontSize =
    appFontType === 'small' ? `${size - 2}` : appFontType === 'large' ? `${size + 2}` : `${size}`;
  return `${fontSize}px`;
};
export const encryptData = (data, key) => {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  var encryptedPass = encrypt.encrypt(data);
  return encryptedPass;
};

export const userGroupType = (userGroupID) => {
  const userGroupTypeObj = {
    1: 'Health Professional',
    2: 'State Medical Council',
    3: 'National Medical Council',
    4: 'College Dean',
    5: 'College Registrar',
    6: 'College Admin',
    7: 'NBE',
  };
  return userGroupTypeObj[userGroupID];
};
export const userGroupId = (userGroupID) => {
  const userGroupTypeObj = {
    1: 'Health Professional',
    2: 'State Medical Council',
    3: 'National Medical Council',
    4: 'College',
    7: 'NBE',
  };
  return userGroupTypeObj[userGroupID];
};

export const userGroupTypeForSession = (userGroupID) => {
  const userGroupTypeObj = {
    ROLE_HEALTH_PROFESSIONAL: 1,
    ROLE_SMC: 2,
    ROLE_NMC: 3,
    ROLE_COLLEGE_DEAN: 4,
    ROLE_COLLEGE_REGISTRAR: 5,
    ROLE_COLLEGE_ADMIN: 6,
    ROLE_NBE: 7,
  };
  return userGroupTypeObj[userGroupID];
};

export const userGroupTypeId = (userGroupID) => {
  const userGroupTypeObj = {
    1: 'Doctor',
    2: 'SMC',
    3: 'NMC',
    4: 'College',
    5: 'College',
    6: 'College',
    7: 'NBE',
  };
  return userGroupTypeObj[userGroupID];
};

export const userActionType = (actionType) => {
  const actionTypeObj = {
    Submitted: 1,
    Forwarded: 2,
    'Query Raised': 3,
    Approved: 4,
    Rejected: 5,
  };
  return actionTypeObj[actionType];
};
export const userActionId = (actionType) => {
  const actionTypeObj = {
    1: 'Submitted',
    2: 'Forwarded',
    3: 'Query Raised',
    4: 'Approve',
    5: 'Rejected',
    6: 'Temporary suspension',
    7: 'Permanent Suspension',
  };
  return actionTypeObj[actionType];
};
export const trackApplicationLabel = (userGroupID) => {
  const userGroupTypeObj = {
    Submitted: 'Completed',
    Forwarded: 'Completed',
    'Query Raised': 'Query Raised',
    Approve: 'Completed',
    Rejected: 'Rejected',
  };
  return userGroupTypeObj[userGroupID];
};

export const trackApplicationStatusColor = (actionType) => {
  const actionTypeObj = {
    Submitted: 'green',
    Forwarded: 'green',
    'Query Raised': 'orange',
    Approve: 'green',
    Rejected: 'red',
    'Temporary suspension': 'red',
    'Permanent Suspension': 'red',
  };
  return actionTypeObj[actionType];
};
export const workflowStatusId = (actionType) => {
  const actionTypeObj = {
    1: ' Pending',
    2: ' Approved',
    3: ' Query Raised',
    4: ' Rejected',
    5: ' Suspend',
    6: ' Suspended',
  };
  return actionTypeObj[actionType];
};
export const typeOfApplication = (actionType) => {
  const actionTypeObj = {
    1: 'HP Registration',
    2: 'HP Modification',
    3: 'Temporary Suspension',
    4: 'Permanent Suspension',
    5: 'Activate Licence',
    6: 'College Registration',
    7: 'Foreign HP Registration',
    8: 'Qualification Work flow',
  };
  return actionTypeObj[actionType];
};

export const usersType = (userType) => {
  const usersObj = {
    Doctor: 1,
    College: 2,
    SMC: 3,
    NMC: 4,
    NBE: 5,
  };
  return usersObj[userType];
};

export const sideBarTabs = (userType) => {
  const usersObj = {
    'Health Professional': doctorTabs,
    'State Medical Council': smcTabs,
    'National Medical Council': nmcTabs,
    'College Dean': colgDeanRegTabs,
    'College Registrar': colgDeanRegTabs,
    'College Admin': colgTabs,
    NBE: nbeTabs,
  };
  return usersObj[userType];
};

export const workSheetTheme = {
  type: 'pattern',
  pattern: 'darkTrellis',
  fgColor: { argb: 'FFFFFF00' },
  bgColor: { argb: '#ffffcc00' },
};

export const replaceString = (original = '', replacement = '', withReplace = '') => {
  return original.replace(replacement, withReplace);
};

export const parserJWT = (token) => {
  let base64Url = token?.split('.')[1];
  let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
  if (base64) {
    let jsonPayload = decodeURIComponent(
      window
        ?.atob(base64)
        ?.split('')
        ?.map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        ?.join('')
    );

    return JSON.parse(jsonPayload);
  } else {
    return false;
  }
};

export const millisecondToDate = (millisecond) => {
  return new Date(parserJWT(millisecond)?.exp * 1000);
};

function yaerData() {
  var ans = [];
  var date = new Date();
  var presentYear = date.getFullYear();
  for (var i = 1900; i <= presentYear; i++) {
    var entry_struct = {};
    entry_struct['value'] = i.toString();
    entry_struct['label'] = i;
    ans.push(entry_struct);
  }
  return ans;
}

export const getYearData = yaerData();
