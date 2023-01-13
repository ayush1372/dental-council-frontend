import { JSEncrypt } from 'js-encrypt';

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

export const encryption = (value) => {
  // Encrypt with the public key...
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(process.env.REACT_APP_PASS_SITE_KEY);
  const encryptedValue = encrypt.encrypt(value);
  return encryptedValue;
};

// export const userSubType = () => {
//   const userSubTypeObj = { '1': 'College', '2': 'College Registrar', '3': 'College Dean' }
//   var user_sub_type = userSubTypeObj.reduce(function(result, currentObject) {
//     result[currentObject.id] = currentObject.name;
//     return result;
//   }, {});

//   // eslint-disable-next-line no-console
//   console.log('asd', user_sub_type);

// }
