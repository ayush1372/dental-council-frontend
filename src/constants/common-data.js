import { get_year_data } from '../helpers/functions/common-functions';
import { year_data } from '../helpers/functions/common-functions';

export const consentDescription =
  'I, hereby declare that I am voluntarily sharing my Aadhaar Number and demographic information issued by UIDAI, with National Medical Register (NMR) for the sole purpose of creation of User ID. I understand that my User ID can be used and shared for purposes as may be notified by NMR from time to time. Further, I am aware that my personal identifiable information (Name, Address, Age, Date of Birth, Gender and Photograph) may be made available to the entities working in the National Medical Register Ecosystem which inter alia includes stakeholders and entities such as National Medical Council, State Medical Council, Medical Colleges, National Board of Examination, which are registered with or linked to the National Medical Register, and various processes there under. I authorize NMR to use my Aadhaar number for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, on response of “Yes” with NMR upon successful authentication. I consciously choose to use Aadhaar number for the purpose of availing benefits across the NMR. I am aware that my personal identifiable information excluding Aadhaar number / VID number can be used and shared for purposes as mentioned above. I reserve the right to revoke the given consent at any point of time as per provisions of Aadhaar Act and Regulations.';

export const UniqueUserNameForDoctor = [
  { id: '1', name: 'aarushi.sharma3' },
  { id: '1', name: 'aarushisharma390' },
  { id: '1', name: 'sharmaaarushi090' },
  { id: '1', name: 'aarushi.sharma309' },
];

export const getSMCProfileDetails = (details) => [
  { label: 'Name', value: details?.first_name, id: '1' },
  // Commenting the below fields from edit profile Issue ID - CS-2078
  // { label: 'Enrolment Number NDHM', value: details?.ndhm_enrollment, id: '2' },
  // { label: 'Enrolment Number', value: details?.enrolled_number, id: '5' },
  { label: 'Phone Number', value: details?.mobile_no, id: '3' },
  { label: 'Email Address', value: details?.email_id, id: '4' },
  { label: 'Council', value: details?.state_medical_council?.name, id: '6' },
];

export const getNMCProfileDetails = (details) => [
  { label: 'Name', value: details?.first_name, id: '1' },
  // Commenting the below fields from edit profile Issue ID - CS-2078
  // { label: 'Enrolment Number NDHM', value: details?.ndhm_enrollment, id: '2' },
  // { label: 'Enrolment Number', value: details?.enrolled_number, id: '3' },
  // { label: 'Council', value: details?.state_medical_council?.name, id: '4' },
  { label: 'Phone Number', value: details?.mobile_no, id: '5' },
  { label: 'Email Address', value: details?.email_id, id: '6' },
];

export const getNBEProfileDetails = (details) => [
  { label: 'User ID', value: details.id, id: '2' },
  { label: 'Name', value: details.display_name, id: '1' },
  { label: 'Phone Number', value: details.mobile_no, id: '4' },
  { label: 'Email Address', value: details.email_id, id: '5' },
];

export const yearsData = get_year_data();
export const yeardata = year_data();

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
  'Total Registration Requests': 'Total Registration request',
  Rejected: 'Rejected',
  Approved: 'Approved',
  'Query Raised': 'Query Raised',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  Pending: 'Pending',
  'College Verified': 'College Verified',
};
export const updationRequestMapper = {
  'Total Modification Requests': 'Total Updation request',
  Rejected: 'Request Rejected',
  Approved: 'Update Request Approved',
  'Query Raised': 'Query Raised on Update Request',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  Pending: 'Update Request Received',
  'College Verified': 'College Verified',
};

export const suspensionRequestMapper = {
  'Total Suspension Requests': 'Total Suspension request',
  'Permanent Suspension Requests Received': 'Permanent Suspension Requests Received',
  'Temporary Suspension Requests Approved': 'Temporary Suspension Requests Approved',
  'Permanent Suspension Requests Approved': 'Permanent Suspension Requests Approved',
  Suspended: 'Suspended',
  Blacklisted: 'Blacklisted',
  'Temporary Suspension Requests Received': 'Temporary Suspension Requests Received',
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

export const applicationType = [
  { id: 1, name: 'HP Registration' },
  { id: 2, name: 'HP Modification' },
  { id: 3, name: 'Temporary Suspension' },
  { id: 4, name: 'Permanent Suspension' },
  { id: 5, name: 'Activate License' },
  // { id: 6, name: 'College Registration' },
  { id: 6, name: 'Foreign HP Registration' },
  { id: 7, name: 'Qualification Workflow' },
];
export const applicationStatus = [
  { id: 1, name: 'Pending' },
  { id: 2, name: 'Approved' },
  { id: 3, name: 'Query Raised' },
  { id: 4, name: 'Rejected' },
  { id: 5, name: 'Suspend' },
  { id: 6, name: 'Blacklisted' },
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
  { id: 'applicantFullName', name: 'Name of Applicant' },
  { id: 'registrationNumber', name: 'Registration No' },
  { id: 'emailId', name: 'Email ID' },
  { id: 'gender', name: 'Gender' },
  { id: 'mobileNumber', name: 'Mobile Number' },
  { id: 'yearOfRegistration', name: 'Year of Registration' },
];

// export const ActivateLicenceFieldList = [
//   { id: 'healthProfessionalName', name: 'Applicant Name' },
//   { id: 'registrationNumber', name: 'Registration No' },
// ];

export const DashBoardCardsFieldList = [
  { id: 'applicantFullName', name: 'Name of Applicant' },
  { id: 'registrationNumber', name: 'Registration No' },
  { id: 'councilName', name: 'Name of Council' },
  { id: 'emailId', name: 'Email ID' },
  { id: 'gender', name: 'Gender' },
  { id: 'mobileNumber', name: 'Mobile Number' },
  { id: 'yearOfRegistration', name: 'Year of Registration' },
];

export const TrackStatusFieldList = [
  { id: 'applicantFullName', name: 'Name of Applicant' },
  { id: 'registrationNumber', name: 'Registration No' },
  { id: 'emailId', name: 'Email ID' },
  { id: 'gender', name: 'Gender' },
  { id: 'mobileNumber', name: 'Mobile Number' },
  { id: 'yearOfRegistration', name: 'Year of Registration' },
];
