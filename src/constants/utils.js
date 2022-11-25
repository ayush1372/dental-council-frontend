function get_year_data() {
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
export const StateNames = [
  { id: '1', name: 'Andhra Pradesh' },
  { id: '2', name: 'Maharastra' },
  { id: '3', name: 'Delhi' },
  { id: '4', name: 'Karnataka' },
  { id: '5', name: 'Telangana' },
  { id: '6', name: 'Puducherry' },
  { id: '7', name: 'Kerala' },
  { id: '8', name: 'Tamilnadu' },
  { id: '9', name: 'Madhya Pradesh' },
  { id: '10', name: 'Gujarat' },
  { id: '11', name: 'Rajasthan' },
  { id: '12', name: 'Uttar Pradesh' },
];
export const RegistrationCouncilNames = [
  { id: '1', name: 'West Bengal Medical Council' },
  { id: '2', name: 'Maharastra Medical Council' },
  { id: '3', name: 'Andhra Pradesh Medical Council' },
  { id: '4', name: 'Karnataka Medical Council' },
  { id: '5', name: 'Telangana Medical Council' },
  { id: '6', name: 'Puducherry Medical Council' },
  { id: '7', name: 'Kerala Medical Council' },
  { id: '8', name: 'Tamilnadu Medical Council' },
  { id: '9', name: 'Madhya Pradesh Medical Council' },
  { id: '10', name: 'Gujarat Medical Council' },
  { id: '11', name: 'Rajasthan Medical Council' },
  { id: '12', name: 'Uttar Pradesh Medical Council' },
];
export const smcProfileDetails = [
  { label: 'Name', value: 'Aarnav Sharma', id: '1' },
  { label: 'Enrolment Number NDHM', value: 'No', id: '2' },
  { label: 'Enrolment Number', value: '12345', id: '3' },
  { label: 'User Id', value: 'aarnav.sharma', id: '4' },
  { label: 'Council', value: 'West Bengal', id: '5' },
];
export const nmcProfileDetails = [
  { label: 'Name', value: 'Aarnav Sharma', id: '1' },
  { label: 'PhoneNumber', value: '8765678876', id: '2' },
  { label: 'Email Address', value: 'Arnav.123@abdm.com', id: '3' },
  { label: 'User ID', value: 'Arnav.Sharma', id: '4' },
  { label: 'Password', value: 'Arnav@1234', id: '5' },
];
export const DepartmentNames = [
  { id: '1', name: 'Out patient' },
  { id: '2', name: 'Pharmacy' },
  { id: '3', name: 'Paramedical' },
  { id: '4', name: 'Pathology' },
  { id: '5', name: 'Operation Theater' },
  { id: '6', name: 'Medical Record ' },
  { id: '7', name: 'Surgical' },
  { id: '8', name: 'Radiology' },
  { id: '9', name: 'Rehabilitation' },
  { id: '10', name: ' Inpatient service' },
];
export const UniversityNames = [
  { id: '1', name: 'AIIMS Delhi' },
  { id: '2', name: 'Kasturba Medcial College' },
  { id: '3', name: 'Banaras Hindu University' },
  { id: '4', name: 'Madras Medical college' },
  { id: '5', name: 'Osmania Medical College' },
  { id: '6', name: 'Christian Medical College' },
  { id: '7', name: 'St. John’s Medical College' },
  { id: '8', name: 'AIIMS Jodhpur' },
  { id: '9', name: 'Medcial Science University Of Delhi' },
  { id: '10', name: 'Andhra Medcial College Vishakapatnam' },
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
export const collegeProfileData = {
  collegename: { id: '1', name: 'Aarnav sharma' },
  collegeId: { id: '1', name: '132118' },
  collegePhnNumber: { id: '1', name: '+91 9876565432' },
  collegeEmailId: { id: '1', name: 'aarnav.singh@ipuni.co.in' },
  DepartmentName: { id: '1', name: 'Medical Sciences' },
  StateName: { id: '1', name: 'New delhi' },
  collegeWebsite: { id: '1', name: 'ipuniversity.co.in' },
  collegeAddress: { id: '1', name: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078' },
  collegePinCode: { id: '1', name: '110088' },
  collegeUniversityName: { id: '1', name: 'Delhi University' },
};
