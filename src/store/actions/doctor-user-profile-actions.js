import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getDoctorUserProfile } from '../reducers/doctor-user-profile-reducer';
export const getDoctorUserProfileList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileList.DoctorUserProfile,
    })
      .then((response) => {
        dispatch(getDoctorUserProfile(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
