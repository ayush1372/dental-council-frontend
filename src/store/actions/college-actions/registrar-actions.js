/* eslint-disable no-console */
// import { useSelector } from 'react-redux';

// import { API } from '../../../api/api-endpoints';
// import { POST } from '../../../constants/requests';
// import { useAxiosCall } from '../../../hooks/use-axios';
// import { detailsOfRegistrar } from '../../reducers/college-reducer';
// export const sendRegistrarDetails = (details) => async (dispatch) => {
//   // export const sendRegistrarDetails = async (details) => {
//   console.log('onsubmit response==>', details);
//   // const details = useSelector((state) => state.collegeData.registrarDetails);
//   let id = null;
//   let name = details.registrarName;
//   let phone_number = details.registrarPhoneNumber;
//   let email_id = details.registrarEmail;
//   let user_id = null;
//   let password = details.registrarPassword;
//   console.log('clicked1');
//   return await new Promise((resolve, reject) => {
//     useAxiosCall({
//       method: POST,
//       url: API.college.registrar,
//       headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }, //should show to john and ashivini
//       data: {
//         id,
//         name,
//         phone_number,
//         email_id,
//         user_id,
//         password,
//       },
//     })
//       .then((response) => { //not getting called
//         console.log(response,'response')
//         dispatch(detailsOfRegistrar(response))
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

// export const validateOtpAadhaar = async () => {
//   const details = useSelector((state) => state.collegeData.registrarDetails);
// const id = null;
//   const name = details.registrarName;
//   const phone_number = details.registrarPhoneNumber;
//   const email_id = details.registrarEmail;
//    user_id = null;

//   return await new Promise((resolve, reject) => {
//     useAxiosCall({
//       method: POST,
//       url: API.Aadhaar.verifyAadhaarOtp,
//       data: { aadhaarNumber, txnId, otp },
//     })
//       .then((response) => {
//         console.log('otp response===>', response);
//         return resolve(response);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };
