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
export const StateNames = [
  { value: '1', label: 'Andhra Pradesh' },
  { value: '2', label: 'Maharastra' },
  { value: '3', label: 'Delhi' },
  { value: '4', label: 'Karnataka' },
  { value: '5', label: 'Telangana' },
  { value: '6', label: 'Puducherry' },
  { value: '7', label: 'Kerala' },
  { value: '8', label: 'Tamilnadu' },
  { value: '9', label: 'Madhya Pradesh' },
  { value: '10', label: 'Gujarat' },
  { value: '11', label: 'Rajasthan' },
  { value: '12', label: 'Uttar Pradesh' },
];
export const RegistrationCouncilNames = [
  { value: '1', label: 'West Bengal Medical Council' },
  { value: '2', label: 'Maharastra Medical Council' },
  { value: '3', label: 'Andhra Pradesh Medical Council' },
  { value: '4', label: 'Karnataka Medical Council' },
  { value: '5', label: 'Telangana Medical Council' },
  { value: '6', label: 'Puducherry Medical Council' },
  { value: '7', label: 'Kerala Medical Council' },
  { value: '8', label: 'Tamilnadu Medical Council' },
  { value: '9', label: 'Madhya Pradesh Medical Council' },
  { value: '10', label: 'Gujarat Medical Council' },
  { value: '11', label: 'Rajasthan Medical Council' },
  { value: '12', label: 'Uttar Pradesh Medical Council' },
];

export const DepartmentNames = [
  { value: '1', label: 'Out patient' },
  { value: '2', label: 'Pharmacy' },
  { value: '3', label: 'Paramedical' },
  { value: '4', label: 'Pathology' },
  { value: '5', label: 'Operation Theater' },
  { value: '6', label: 'Medical Record ' },
  { value: '7', label: 'Surgical' },
  { value: '8', label: 'Radiology' },
  { value: '9', label: 'Rehabilitation' },
  { value: '10', label: ' Inpatient service' },
  // { value: '4', label: 4 },
  // { value: '5', label: 5 },
  // { value: '6', label: 6 },
  // { value: '7', label: 7 },
  // { value: '8', label: 8 },
  // { value: '9', label: 9 },
  // { value: '10', label: 10 },
  // { value: '11', label: 11 },
  // { value: '12', label: 12 },
  // { value: '13', label: 13 },
  // { value: '14', label: 14 },
  // { value: '15', label: 15 },
  // { value: '16', label: 16 },
  // { value: '17', label: 17 },
  // { value: '18', label: 18 },
  // { value: '19', label: 19 },
  // { value: '20', label: 20 },
  // { value: '21', label: 21 },
  // { value: '22', label: 22 },
  // { value: '23', label: 23 },
  // { value: '24', label: 24 },
  // { value: '25', label: 25 },
  // { value: '26', label: 26 },
  // { value: '27', label: 27 },
  // { value: '28', label: 28 },
  // { value: '29', label: 29 },
  // { value: '30', label: 30 },
  // { value: '31', label: 31 },
];

export const yearsData = get_year_data();

export const monthsData = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const daysData = [
  { value: '1', label: 1 },
  { value: '2', label: 2 },
  { value: '3', label: 3 },
  { value: '4', label: 4 },
  { value: '5', label: 5 },
  { value: '6', label: 6 },
  { value: '7', label: 7 },
  { value: '8', label: 8 },
  { value: '9', label: 9 },
  { value: '10', label: 10 },
  { value: '11', label: 11 },
  { value: '12', label: 12 },
  { value: '13', label: 13 },
  { value: '14', label: 14 },
  { value: '15', label: 15 },
  { value: '16', label: 16 },
  { value: '17', label: 17 },
  { value: '18', label: 18 },
  { value: '19', label: 19 },
  { value: '20', label: 20 },
  { value: '21', label: 21 },
  { value: '22', label: 22 },
  { value: '23', label: 23 },
  { value: '24', label: 24 },
  { value: '25', label: 25 },
  { value: '26', label: 26 },
  { value: '27', label: 27 },
  { value: '28', label: 28 },
  { value: '29', label: 29 },
  { value: '30', label: 30 },
  { value: '31', label: 31 },
];

export const validateAadharNumber = (aadhaarNumber) => {
  // multiplication table
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  // permutation table
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  let c = 0;
  let invertedArray = aadhaarNumber.split('').map(Number).reverse();
  invertedArray.forEach((val, i) => {
    c = d[c][p[i % 8][val]];
  });
  return c === 0;
};
