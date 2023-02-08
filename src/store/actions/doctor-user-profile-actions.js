import { API } from '../../api/api-endpoints';
import { GET, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getPersonalDetails,
  getProfileImage,
  getRegistrationDetails,
  getWorkProfileDetails,
} from '../reducers/doctor-user-profile-reducer';
// export const getPersonalDetailsData = (doctor_profile_id) => async (dispatch) => {
export const getPersonalDetailsData =
  (doctor_profile_id = 248) =>
  async (dispatch) => {
    return await new Promise((resolve, reject) => {
      useAxiosCall({
        method: GET,
        url: API.DoctorUserProfileData.personalDetails.replace(
          '{doctor_profile_id}',
          doctor_profile_id
        ),
      })
        .then((response) => {
          dispatch(getPersonalDetails(response.data));
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };
// export const getRegistrationDetailsData = (doctor_profile_id) => async (dispatch) => {
export const getRegistrationDetailsData =
  (doctor_profile_id = 248) =>
  async (dispatch) => {
    return await new Promise((resolve, reject) => {
      useAxiosCall({
        method: GET,
        url: API.DoctorUserProfileData.registrationDetails.replace(
          '{doctor_profile_id}',
          doctor_profile_id
        ),
      })
        .then((response) => {
          dispatch(getRegistrationDetails(response.data));
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };
// export const getWorkProfileDetailsData = (doctor_profile_id) => async (dispatch) => {
export const getWorkProfileDetailsData =
  (doctor_profile_id = 248) =>
  async (dispatch) => {
    return await new Promise((resolve, reject) => {
      useAxiosCall({
        method: GET,
        url: API.DoctorUserProfileData.workProfileDetails.replace(
          '{doctor_profile_id}',
          doctor_profile_id
        ),
      })
        .then((response) => {
          dispatch(getWorkProfileDetails(response.data));
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
  };

export const getNewDoctorUserProfileData = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.personalDetails,
    })
      .then((response) => {
        dispatch(getPersonalDetails(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateDoctorPersonalDetails = (body, doctor_profile_id) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.DoctorUserProfileData.personalDetails.replace(
        '{doctor_profile_id}',
        doctor_profile_id
      ),
      data: body,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateDoctorRegistrationDetails = (body, doctor_profile_id) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.DoctorUserProfileData.registrationDetails.replace(
        '{doctor_profile_id}',
        doctor_profile_id
      ),
      data: body,
    })
      .then((response) => {
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
