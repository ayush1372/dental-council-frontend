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
    return arrayOfStrings.map((item) => ({
      label: item.name,
      value: item[valueKey],
    }));
  } else {
    return [];
  }
};

export const changeAppFontSize = (size, appFontType) => {
  // eslint-disable-next-line no-console
  console.log('size in commom', appFontType, size, `${size - 2}`, `${size + 2}`);
  const fontSize =
    appFontType === 'small' ? `${size - 2}` : appFontType === 'large' ? `${size + 2}` : `${size}`;
  return `${fontSize}px`;
};
