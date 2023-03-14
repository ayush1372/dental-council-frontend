import { get_year_data } from '../helpers/functions/common-functions';
export const accesstokenHprId =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1WVpwM043VlFCdEE1cDZwcktkdXYyV0NaTTZVVlFVLWZTcEZJb0tiQU9ZIn0.eyJleHAiOjE2Nzg4MTM4NDMsImlhdCI6MTY3ODc3Nzg0MywianRpIjoiNmVjNmUwYjQtZWRlZS00ZTgzLTkzNDAtMjFmNjc1YmJkMWMzIiwiaXNzIjoiaHR0cHM6Ly9wcmVwcm9kLmFiZG0uZ292LmluL2F1dGgvcmVhbG1zL2NlbnRyYWwtcmVnaXN0cnkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZmUzZTEwMDctNjZlMi00OTkzLWFmYTktYjMyYjM1NDk1NDIwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaHBfaWQiLCJzZXNzaW9uX3N0YXRlIjoiY2Y2NzAxZjItNGYwYi00Y2NlLThiYjUtZDg5MGU1N2M2NGQxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjkwMDciXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiaGVhbHRoSWQiLCJocF9pZCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfSwiaHBfaWQiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiY2xpZW50SWQiOiJocF9pZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjEwLjIzMy42Ny45NyIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1ocF9pZCIsImNsaWVudEFkZHJlc3MiOiIxMC4yMzMuNjcuOTcifQ.SRI5IWUz98V0FA3ZAZUT8OA92lNuO89eDDDx4LTLxFR2aNx_BzdDxfF6n6PRUNULYYvKiNtsLeAhLtba7uBlYKJUQFzzzS4sPChIdle8qVT_mNigfAkL2Uypi5wM0vdgVrV0ANIiK7_9AoX1od3hwLc6Kz_HMPKlbzAvKmD3xX_-0L6qIb31CCu7m9lSnrZUogibk8rR2aDslI-UM5rhpK8NOWucbHPg4sHQt49HQLHz_oNROUTys2VVF-3OAjbLKsoj0VE144QWt0W5z54bH3yZX_3-PrU25K98z2mFrzZDvGVUcRuiFS2leFCllFlwaYrzP3kG8zQsug6qfqSxiA';
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
  { label: 'Name', value: details?.first_name, id: '1' },
  { label: 'Enrolment Number NDHM', value: details?.ndhm_enrollment, id: '2' },
  { label: 'Enrolment Number', value: details?.enrolled_number, id: '3' },
  { label: 'Council', value: details?.state_medical_council?.name, id: '4' },
  { label: 'Phone Number', value: details?.mobile_no, id: '5' },
  { label: 'Email Address', value: details?.email_id, id: '6' },
];

export const getNMCProfileDetails = (details) => [
  { label: 'Name', value: details?.first_name, id: '1' },
  { label: 'Enrolment Number NDHM', value: details?.ndhm_enrollment, id: '2' },
  { label: 'Enrolment Number', value: details?.enrolled_number, id: '3' },
  { label: 'Council', value: details?.state_medical_council?.name, id: '4' },
  { label: 'Phone Number', value: details?.mobile_no, id: '5' },
  { label: 'Email Address', value: details?.email_id, id: '6' },
];

export const getNBEProfileDetails = (details) => [
  { label: 'User ID', value: details.id, id: '2' },
  { label: 'Name', value: details.display_name, id: '1' },
  { label: 'Phone Number', value: details.mobile_no, id: '4' },
  { label: 'Email Address', value: details.email_id, id: '5' },
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
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
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

// dashboard count mapping
// mapping BE keys -> card titles on FE
export const registrationRequestMapper = {
  'Total HP Registration Requests': 'Total Registration request',
  Rejected: 'Rejected',
  Approved: 'Approved',
  'Query Raised': 'Query Raised',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  Pending: 'Pending',
};
export const updationRequestMapper = {
  'Total HP Modification Requests': 'Total Updation request',
  Rejected: 'Request Rejected',
  Approved: 'Update Request Approved',
  'Query Raised': 'Query Raised on Update Request',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  Pending: 'Update Request Received',
};

export const suspensionRequestMapper = {
  'Total Consolidated Suspension Requests': 'Total Suspension request',
  Rejected: 'Rejected',
  Approved: 'Approved',
  'Query Raised': 'Query Raised',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  Pending: 'Pending',
};

export const DashboardData = [
  { header: 'IMR ID/Registration NO', key: 'registration_no' },
  { header: 'Name of Applicant', key: 'applicant_full_name' },
  { header: 'Name of State Council', key: 'council_name' },
  { header: 'Council Verification Status', key: 'smc_status' },
  { header: 'College Verification Status', key: 'college_dean_status' },
  { header: 'NMC Verification Status', key: 'nmc_status' },
  { header: 'Date of Submission', key: 'created_at' },
  { header: 'Pendency', key: 'pendency' },
];
export const CollegeApproval = [
  { header: 'College_ID', key: 'college_id' },
  { header: 'College Name', key: 'college_name' },
  { header: 'Name Of State Council', key: 'council_name' },
  { header: 'Council Verification Status', key: 'status' },
  { header: 'Date of Submission', key: 'submitted_on' },
  { header: 'Pendency', key: 'pendency' },
];
export const ActivateLicence = [
  { header: 'IMR ID/Registration NO', key: 'registration_id' },
  { header: 'Applicant Name', key: 'health_professional_name' },
  { header: 'Date of Submission', key: 'submitted_date' },
  { header: 'Reactivation from Date', key: 'submitted_date' },
  { header: 'Type of Suspension', key: 'typeOfSuspension' },
  { header: 'Remark', key: 'remarks' },
  { header: 'RequestId', key: 'request_id' },
];
export const TrackApplication = [
  { header: 'Request ID', key: 'request_id' },
  { header: 'Type of Application', key: 'application_type_name' },
  { header: 'Date of Submission', key: 'created_at' },
  { header: 'Current Status', key: 'doctor_status' },
  { header: 'Pendency', key: 'pendency' },
];

export const searchDoctorResult = [
  {
    full_name: 'Monnie Doe',
    profile_id: '100',
    profile_photo:
      'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
    registration_number: '9011255793',
    registration_year: '2023',
    salutation: 'Mr.',
    state_medical_council: 'Maharashtra Medical Council',
    registration_date: '04/04/1998',
    nmr_id: 'IN23192789111',
    dateOfBirth: '19/07/1979',
    mobile_no: '9769363879',
    email_address: 'mdoe@gmail.com',
    qualitfications: [
      {
        qualification: 'MBBS',
        qualification_year: '2002',
        university_name: 'University of Pune',
      },
      {
        qualification: 'MD',
        qualification_year: '2004',
        university_name: 'University of Pune',
      },
      {
        qualification: 'PhD',
        qualification_year: '2006',
        university_name: 'University of Mumbai',
      },
    ],
  },
  {
    full_name: 'John Doe',
    profile_id: '100',
    profile_photo:
      'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
    registration_number: '9011259897',
    registration_year: '2023',
    salutation: 'Mr.',
    state_medical_council: 'Maharashtra Medical Council',
    registration_date: '02/04/1996',
    nmr_id: 'IN23192789186',
    dateOfBirth: '16/04/1977',
    mobile_no: '9769363859',
    email_address: 'jdoe@gmail.com',
    qualitfications: [
      {
        qualification: 'MBBS',
        qualification_year: '2000',
        university_name: 'University of Mumbai',
      },
      {
        qualification: 'MD',
        qualification_year: '2002',
        university_name: 'University of Mumbai',
      },
    ],
  },
  {
    full_name: 'Anna Dosh',
    profile_id: '100',
    profile_photo:
      'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
    registration_number: '9011259168',
    registration_year: '2023',
    salutation: 'Ms.',
    state_medical_council: 'Maharashtra Medical Council',
    registration_date: '21/03/1999',
    nmr_id: 'IN23192789272',
    dateOfBirth: '17/09/1980',
    mobile_no: '9769365879',
    email_address: 'adosh@gmail.com',
    qualitfications: [
      {
        qualification: 'MBBS',
        qualification_year: '2003',
        university_name: 'University of Calcutta',
      },
      {
        qualification: 'MD',
        qualification_year: '2005',
        university_name: 'University of Calcutta',
      },
      {
        qualification: 'PhD',
        qualification_year: '2007',
        university_name: 'University of Calcutta',
      },
    ],
  },
];

export const applicationType = [
  { id: 1, name: 'HP Registration' },
  { id: 2, name: 'HP Modification' },
  { id: 3, name: 'Temporary Suspension' },
  { id: 4, name: 'Permanent Suspension' },
  { id: 5, name: 'Activate License' },
  { id: 6, name: 'College Registration' },
  { id: 7, name: 'Foreign HP Registration' },
  { id: 8, name: 'Qualification Workflow' },
];
export const applicationStatus = [
  { id: 1, name: 'SUBMITTED' },
  { id: 2, name: 'PENDING' },
  { id: 3, name: 'REJECTED' },
  { id: 4, name: 'FORWARDED' },
  { id: 5, name: 'APPROVED' },
  { id: 6, name: 'NOT YET RECEIVED' },
  { id: 7, name: 'QUERY RAISED' },
];
export const filterDropDownData = [
  { id: 'applicationTypeId', name: 'Type of Application ' },
  { id: 'workFlowStatusId', name: ' Current Status' },
];
export const emptyData = [
  {
    id: '1',
    name: '-',
  },
];

export const CollegeApprovalFieldList = [
  { id: 'collegeName', name: 'College Name' },
  { id: 'councilName', name: 'Name of State Council ' },
];

export const ActivateLicenceFieldList = [
  { id: 'healthProfessionalName', name: 'Applicant Name' },
  { id: 'registrationNumber', name: 'Registration No' },
];

export const DashBoardCardsFieldList = [
  { id: 'registrationNumber', name: 'Registration No' },
  { id: 'applicantFullName', name: 'Name of Applicant' },
  { id: 'councilName', name: 'Name of State Council' },
];
