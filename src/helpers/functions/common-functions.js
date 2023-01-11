import JSEncrypt from 'jsencrypt';

import { verboseLog } from '../../config/debug';

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

export const changeAppFontSize = (size, appFontType) => {
  const fontSize =
    appFontType === 'small' ? `${size - 2}` : appFontType === 'large' ? `${size + 2}` : `${size}`;
  return `${fontSize}px`;
};
export const encryptData = (data) => {
  var publicKey = process.env.REACT_APP_PUBLIC_KEY;
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  var encryptedPass = encrypt.encrypt(data);
  verboseLog('encryption pass & key==>', encryptedPass);
  return encryptedPass;
};
