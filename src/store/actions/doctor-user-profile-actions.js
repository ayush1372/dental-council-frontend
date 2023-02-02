import { API } from '../../api/api-endpoints';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getDoctorUserProfile, getProfileImage } from '../reducers/doctor-user-profile-reducer';
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
export const getUserProfileImage = (hp_profile_id, file) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.profileImage.replace('{hp_profile_id}', hp_profile_id),
      headers: { 'Content-Type': 'multipart/form-data' },
      data: file,
    })
      .then((response) => {
        dispatch(getProfileImage(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
