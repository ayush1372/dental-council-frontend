import JSEncrypt from 'jsencrypt';

import {
  colgDeanRegTabs,
  colgTabs,
  doctorTabs,
  nbeTabs,
  nmcTabs,
  smcTabs,
} from '../components/sidebar-drawer-list-item';

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

export const createSelectFieldData = (arrayOfStrings, valueKey = 'id') => {
  if (arrayOfStrings && arrayOfStrings.length > 0) {
    return arrayOfStrings?.map((item) => ({
      label: item?.name,
      value: item[valueKey],
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

export const userGroupTypeForSession = (userGroupID) => {
  const userGroupTypeObj = {
    ROLE_HEALTH_PROFESSIONAL: 'Health Professional',
    ROLE_SMC: 'State Medical Council',
    ROLE_NMC: 'National Medical Council',
    ROLE_COLLEGE_DEAN: 'College Dean',
    ROLE_COLLEGE_REGISTRAR: 'College Registrar',
    ROLE_COLLEGE_ADMIN: 'College Admin',
    ROLE_NBE: 'NBE',
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
