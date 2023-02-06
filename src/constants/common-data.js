import { get_year_data } from '../helpers/functions/common-functions';
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
  { id: '2', name: 'Maharashtra Medical Council' },
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
export const UniqueUserNameForDoctor = [
  { id: '1', name: 'aarushi.sharma3' },
  { id: '1', name: 'aarushisharma390' },
  { id: '1', name: 'sharmaaarushi090' },
  { id: '1', name: 'aarushi.sharma309' },
];

export const getSMCProfileDetails = (details) => [
  { label: 'Name', value: details.display_name, id: '1' },
  { label: 'Enrolment Number NDHM', value: details.ndhm_enrollment, id: '2' },
  { label: 'Enrolment Number', value: details.enrolled_number, id: '3' },
  { label: 'Council', value: details.state_medical_council.name, id: '4' },
  { label: 'Phone Number', value: details.mobile_no, id: '5' },
  { label: 'Email Address', value: details.email_id, id: '6' },
];

export const getNMCProfileDetails = (details) => [
  { label: 'Name', value: details.display_name, id: '1' },
  { label: 'Enrolment Number NDHM', value: details.ndhm_enrollment, id: '2' },
  { label: 'Enrolment Number', value: details.enrolled_number, id: '3' },
  { label: 'Council', value: details.state_medical_council.name, id: '4' },
  { label: 'Phone Number', value: details.mobile_no, id: '5' },
  { label: 'Email Address', value: details.email_id, id: '6' },
];

export const getNBEProfileDetails = (details) => [
  { label: 'Name', value: details.display_name, id: '1' },
  { label: 'Enrolment Number NDHM', value: details.ndhm_enrollment, id: '2' },
  { label: 'Enrolment Number', value: details.enrolled_number, id: '3' },
  // { label: 'Phone Number', value: details.mobile_no, id: '4' },
  // { label: 'Email Address', value: details.email_id, id: '5' },
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
export const trackstatusData = {
  message: [
    {
      SNo: 1,
      registrationNo: '71-1567-8728-1025',
      nameofApplicant: 'Basavaraj S Harihar',
      nameofStateCouncil: 'West Bengal Medical Council',
      councilVerificationStatus: 'Submitted',
      collegeVerificationStatus: 'Submitted',
      NMCVerificationStatus: 'Submitted',
      dateofSubmission: '31-Oct-2022',
      pendency: '25',
      pending: 'N/A',
      requestNMC: 'view',
    },
  ],
};

export const applications = {
  message: [
    {
      SNo: 1,
      registrationNo: '71-1567-8728-1025',
      nameofApplicant: 'A Basavaraj S Harihar',
      nameofStateCouncil: 'L West Bengal Medical Council',
      councilVerificationStatus: 'Submitted',
      collegeVerificationStatus: 'A Submitted',
      NMCVerificationStatus: 'P Submitted',
      dateofSubmission: '2026-06-25 05:03:57.0',
      pendency: '28',
      view: 'view',
    },
    {
      SNo: 2,
      registrationNo: '70-1567-8728-1025',
      nameofApplicant: 'Z Basavaraj S Harihar',
      nameofStateCouncil: 'I West Bengal Medical Council',
      councilVerificationStatus: 'Pending',
      collegeVerificationStatus: 'X Submitted',
      NMCVerificationStatus: 'Q Submitted',
      dateofSubmission: '2028-12-10 16:35:24.0',
      pendency: '21',
      view: 'view',
    },
    {
      SNo: 3,
      registrationNo: '76-1567-8728-1025',
      nameofApplicant: 'T Basavaraj S Harihar',
      nameofStateCouncil: 'T West Bengal Medical Council',
      councilVerificationStatus: 'Reject',
      collegeVerificationStatus: 'P Submitted',
      NMCVerificationStatus: 'L Submitted',
      dateofSubmission: '2022-07-22 09:59:04.0',
      pendency: '20',
      view: 'view',
    },
    {
      SNo: 4,
      registrationNo: '74-1567-8728-1025',
      nameofApplicant: 'E Basavaraj S Harihar',
      nameofStateCouncil: 'U West Bengal Medical Council',
      councilVerificationStatus: 'Approved',
      collegeVerificationStatus: 'Submitted',
      NMCVerificationStatus: 'Submitted',
      dateofSubmission: '2023-08-23 06:11:06.0',
      pendency: '23',
      view: 'view',
    },
    {
      SNo: 5,
      registrationNo: '79-1567-8728-1025',
      nameofApplicant: 'K Basavaraj S Harihar',
      nameofStateCouncil: 'A West Bengal Medical Council',
      councilVerificationStatus: 'Submitted',
      collegeVerificationStatus: 'Submitted',
      NMCVerificationStatus: 'Submitted',
      dateofSubmission: '2022-09-24 17:10:11.0',
      pendency: '28',
      view: 'view',
    },
  ],
  count: 5,
};
export const ActivateLicenceData = {
  message: [
    {
      SNo: 1,
      registrationNo: '1772666',
      ApplicantName: 'Basavaraj Harihar',
      DateOfSubmission: '31-oct-2022',
      DateOfReactivation: '26-Sep-2022',
      TypeOfsuspension: 'Temporary',
      Remark: 'Came back from Russia and i want resume my service in india',
    },
    {
      SNo: 2,
      registrationNo: '4772562',
      ApplicantName: 'Harihar',
      DateOfSubmission: '01-oct-2022',
      DateOfReactivation: '21-Dec-2022',
      TypeOfsuspension: 'Permanent',
      Remark: 'Came back from Russia and i want resume my service in india',
    },
    {
      SNo: 3,
      registrationNo: '1772562',
      ApplicantName: 'Shreyas Harihar',
      DateOfSubmission: '03-July-2022',
      DateOfReactivation: '06-Nov-2022',
      TypeOfsuspension: 'Temporary',
      Remark: 'Came back from Russia and i want resume my service in india',
    },
  ],
};

export const collegeApprovalsList = {
  message: [
    {
      SNo: 1,
      collegeId: '71-1567-8728-1025',
      collegeName: 'JNTU',
      collegePhnNumber: '+91 99003739292',
      collegeEmailId: 'mdtes@gmail.com',
      collegeWebsite: 'ipuniversity.co.in',
      collegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      collegePinCode: '110078',
      nameofStateCouncil: 'L West Bengal Medical Council',
      dateofSubmission: '2026-06-25 05:03:57.0',
      pendency: '28',
      state: 'New Delhi',
      view: 'view',
      universityName: 'Delhi University',
    },
    {
      SNo: 2,
      collegeId: '71-1567-8728-1025',
      collegeName: 'JNTU',
      collegePhnNumber: '+91 99003739292',
      collegeEmailId: 'mdtes@gmail.com',
      collegeWebsite: 'ipuniversity.co.in',
      collegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      collegePinCode: '110078',
      nameofStateCouncil: 'I West Bengal Medical Council',
      dateofSubmission: '2028-12-10 16:35:24.0',
      pendency: '21',
      state: 'New Delhi',
      view: 'view',
      universityName: 'Delhi University',
    },
    {
      SNo: 3,
      collegeId: '71-1567-8728-1025',
      collegeName: 'JNTU',
      collegePhnNumber: '+91 99003739292',
      collegeEmailId: 'mdtes@gmail.com',
      collegeWebsite: 'ipuniversity.co.in',
      collegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      collegePinCode: '110078',
      nameofStateCouncil: 'T West Bengal Medical Council',
      dateofSubmission: '2022-07-22 09:59:04.0',
      pendency: '20',
      state: 'New Delhi',
      view: 'view',
      universityName: 'Delhi University',
    },
    {
      SNo: 4,
      collegeId: '71-1567-8728-1025',
      collegeName: 'JNTU',
      collegePhnNumber: '+91 99003739292',
      collegeEmailId: 'mdtes@gmail.com',
      collegeWebsite: 'ipuniversity.co.in',
      collegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      collegePinCode: '110078',
      nameofStateCouncil: 'U West Bengal Medical Council',
      dateofSubmission: '2023-08-23 06:11:06.0',
      pendency: '23',
      state: 'New Delhi',
      view: 'view',
      universityName: 'Delhi University',
    },
    {
      SNo: 5,
      collegeId: '71-7857-3546 -1212',
      collegeName: 'JNTU',
      collegePhnNumber: '+91 99003739292',
      collegeEmailId: 'mdtes@gmail.com',
      collegeWebsite: 'ipuniversity.co.in',
      collegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      collegePinCode: '110078',
      nameofStateCouncil: 'A West Bengal Medical Council',
      dateofSubmission: '2022-09-24 17:10:11.0',
      pendency: '28',
      state: 'New Delhi',
      view: 'view',
      universityName: 'Delhi University',
    },
  ],
  count: 5,
};

export const dashboardCountData = {
  'Registration Request': [
    {
      count: 0,
      name: 'Total Registration Request',
    },
    {
      count: 0,
      name: 'Pending',
    },
    {
      count: 0,
      name: 'Verified',
    },
    {
      count: 0,
      name: 'Query Raised',
    },
    {
      count: 0,
      name: 'Rejected',
    },
  ],
  'Updation Request': [
    {
      count: 0,
      name: 'Total Updation Request',
    },
    {
      count: 0,
      name: 'Update Request Received',
    },
    {
      count: 0,
      name: 'Update Request Approved',
    },
    {
      count: 0,
      name: 'Query Raised on Update Request',
    },
    {
      count: 0,
      name: 'Update Request Rejected',
    },
  ],
  'Suspension Request': [
    {
      count: 0,
      name: 'Total Suspension Request',
    },
    {
      count: 0,
      name: 'Temporary Suspension Request Received',
    },
    {
      count: 0,
      name: 'Temporary Suspension Approved',
    },
    {
      count: 0,
      name: 'Permanent Suspension Request Received',
    },
    {
      count: 0,
      name: 'Permanent Suspension Request Approved',
    },
  ],
};

export const natureOfWork = [
  {
    id: 1,
    name: 'Administrative',
  },
  {
    id: 2,
    name: 'Practice',
  },
  {
    id: 3,
    name: 'Research',
  },
  {
    id: 4,
    name: 'Teaching',
  },
];

export const workStatusOptions = [
  {
    id: 3,
    name: 'Government only',
  },
  {
    id: 2,
    name: 'Private Practice only',
  },
  {
    id: 1,
    name: 'Both',
  },
];
