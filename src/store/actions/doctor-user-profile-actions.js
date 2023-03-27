/* eslint-disable no-console */
import { API } from '../../api/api-endpoints';
import { GET, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { updateTrackApplicationTableData } from '../reducers/common-reducers';
import {
  getPersonalDetails,
  getProfileImage,
  getRegistrationDetails,
  getUpdatedPersonalDetails,
  getUpdatedRegistrationDetails,
  getWorkProfileDetails,
} from '../reducers/doctor-user-profile-reducer';

export const getPersonalDetailsData = (doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileData.personalDetails.replace(
        '{healthProfessionalId}',
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
export const getRegistrationDetailsData = (doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileData.registrationDetails.replace(
        '{healthProfessionalId}',
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
export const getWorkProfileDetailsData = (doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileData.workProfileDetails.replace(
        '{healthProfessionalId}',
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

export const getNewDoctorPersonalDetailsData = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.createPersonalDetails,
      data: body,
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

export const updateDoctorPersonalDetails = (body, doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.DoctorUserProfileData.personalDetails.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      ),
      data: body,
    })
      .then((response) => {
        dispatch(getUpdatedPersonalDetails(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateDoctorRegistrationDetails = (body, doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.DoctorUserProfileData.registrationDetails.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      ),
      data: body,
    })
      .then((response) => {
        dispatch(getUpdatedRegistrationDetails(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateDoctorWorkDetails = (body, doctor_profile_id) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.DoctorUserProfileData.workProfileDetails.replace(
        '{healthProfessionalId}',
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
      url: API.DoctorUserProfileData.profileImage.replace('{healthProfessionalId}', hp_profile_id),
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

export const getDoctorTrackApplicationData = (doctor_profile_id, trackData) => async (dispatch) => {
  let path = '';
  if (trackData.search !== undefined && trackData.search !== null && trackData.search !== '') {
    if (path === '') {
      path += 'search=' + trackData.search;
    } else {
      path += '&search=' + trackData.search;
    }
  }
  if (trackData.value !== undefined && trackData.value !== null && trackData.value !== '') {
    if (path === '') {
      path += 'value=' + trackData.value;
    } else {
      path += '&value=' + trackData.value;
    }
  }

  if (trackData.pageNo !== undefined && trackData.pageNo !== null && trackData.pageNo !== '') {
    path += '&pageNo=' + trackData.pageNo;
  }
  if (trackData.offset !== undefined && trackData.offset !== null && trackData.offset !== '') {
    path += '&offset=' + trackData.offset;
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.DoctorUserProfileData.trackApplicationData.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      )}?${path}`,
    })
      .then((response) => {
        dispatch(
          updateTrackApplicationTableData(response)
          // updateTrackApplicationTableData(response.data?.health_professional_applications || [])
        );
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const updateProfileConsent = (payload) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.profileConsent,
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const additionalQualificationsData = (formData, healthProfessionalId) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.additionalQualifications.replace(
        '{healthProfessionalId}',
        healthProfessionalId
      ),
      headers: { 'Content-Type': 'application/json' },
      data: formData,
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
