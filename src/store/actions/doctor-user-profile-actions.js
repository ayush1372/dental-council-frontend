import { API } from '../../api/api-endpoints';
import { DELETE, GET, PATCH, POST, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
// import successToast from '../../ui/core/toaster';
import {
  updateDoctorTrackApplication,
  updateTrackApplicationTableData,
} from '../reducers/common-reducers';
import {
  getEsignDetails,
  getPersonalDetails,
  getProfileImage,
  getRegistrationDetails,
  getUpdatedPersonalDetails,
  getUpdatedRegistrationDetails,
  getWorkProfileDetails,
} from '../reducers/doctor-user-profile-reducer';
import { getRaisedQuery } from './common-actions';

export const getPersonalDetailsData = (doctor_profile_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.DoctorUserProfileData.personalDetails.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      ),
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        if (response?.data?.hp_profile_status_id === 3) {
          dispatch(getRaisedQuery(response?.data?.hp_profile_id));
        }
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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

export const deleteWorkProfileDetailsData = (facility_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: DELETE,
      url: API.DoctorUserProfileData.workProfileDeLink,
      data: facility_id,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getUpdatedPersonalDetails(response.data));
        dispatch(getPersonalDetails(response.data));
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getFacilitiesData = (facilitiesBody) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.searchFacilities,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accesstoken'),
      },
      data: facilitiesBody,
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
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('accesstoken'),
      },
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
    if (path === '') {
      path += 'pageNo=' + trackData.pageNo;
    } else {
      path += '&pageNo=' + trackData.pageNo;
    }
  }
  if (trackData.offset !== undefined && trackData.offset !== null && trackData.offset !== '') {
    if (path === '') {
      path += 'offset=' + trackData.offset;
    } else {
      path += '&offset=' + trackData.offset;
    }
  }
  if (trackData.sortBy !== undefined && trackData.sortBy !== null && trackData.sortBy !== '') {
    if (path === '') {
      path += 'sortBy=' + trackData.sortBy;
    } else {
      path += '&sortBy=' + trackData.sortBy;
    }
  }
  if (
    trackData.sortOrder !== undefined &&
    trackData.sortOrder !== null &&
    trackData.sortOrder !== ''
  ) {
    if (path === '') {
      path += 'sortOrder=' + trackData.sortOrder;
    } else {
      path += '&sortOrder=' + trackData.sortOrder;
    }
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.DoctorUserProfileData.trackApplicationData.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      )}?${path}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
export const getDoctorTrackApplicationStatus = (nmr_id) => async (dispatch) => {
  return await new Promise((resolve) => {
    useAxiosCall({
      method: GET,
      url: `${API.DoctorUserProfileData.trackApplicationStatus.replace('{requestId}', nmr_id)}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    }).then((response) => {
      dispatch(updateDoctorTrackApplication(response));
      return resolve(response);
    });
    // .catch((error) => {
    //   successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
    // });
  });
};
export const getEsignFormDetails = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.eSign,
      data: data,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getEsignDetails(response));
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accesstoken'),
      },
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

export const additionalQualificationsData =
  (formData, healthProfessionalId, isEditForm) => async () => {
    return await new Promise((resolve, reject) => {
      useAxiosCall({
        method: isEditForm ? PUT : POST,
        url: API.DoctorUserProfileData.additionalQualifications.replace(
          '{healthProfessionalId}',
          healthProfessionalId
        ),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accesstoken'),
        },
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

export const updateDoctorContactDetails = (body, doctor_profile_id) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PATCH,
      url: API.DoctorUserProfileData.personalDetails.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      ),
      data: body,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const userVerifyEmail = (data) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.DoctorUserProfileData.userVerifyEmail,
      data: data,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const verifyEmail = (data, doctor_profile_id) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PATCH,
      url: API.DoctorUserProfileData.verifyEmail.replace(
        '{healthProfessionalId}',
        doctor_profile_id
      ),
      data: data,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
