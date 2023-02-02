import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getDoctorUserProfile } from '../reducers/doctor-user-profile-reducer';
export const getDoctorUserProfileData = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileData.DoctorUserProfile + data?.id,
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
