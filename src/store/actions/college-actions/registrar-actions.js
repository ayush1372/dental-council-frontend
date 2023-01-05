/* eslint-disable no-console */
// import { useSelector } from 'react-redux';

import { API } from '../../../api/api-endpoints';
import { POST } from '../../../constants/requests';
import { useAxiosCall } from '../../../hooks/use-axios';

export const sendRegistrarDetails = async (details) => {
  // const details = useSelector((state) => state.collegeData.registrarDetails);
  let id = null;
  let name = details.registrarName;
  let phone_number = details.registrarPhoneNumber;
  let email_id = details.registrarEmail;
  let user_id = null;
  console.log('clicked1');
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.college.registrar,
      data: {
        id,
        name,
        phone_number,
        email_id,
        user_id,
      },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
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
