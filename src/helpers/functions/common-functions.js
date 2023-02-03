import JSEncrypt from 'jsencrypt';

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
