import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getColleges,
  getCountries,
  getCourses,
  getDistricts,
  getLanguages,
  getSpecialities,
  getStates,
  getSubDistricts,
  getUniversities,
  updateCouncilNames,
} from '../reducers/common-reducers';

export const getStatesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.states,
    })
      .then((response) => {
        dispatch(getStates(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getSubDistrictsList = (districtId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.subDistricts.replace('{district_id}', districtId),
    })
      .then((response) => {
        dispatch(getSubDistricts(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCountriesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.countries,
    })
      .then((response) => {
        dispatch(getCountries(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getDistrictList = (stateId) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.districts.replace('{state_id}', stateId),
    })
      .then((response) => {
        dispatch(getDistricts(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getLanguagesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.languages,
    })
      .then((response) => {
        dispatch(getLanguages(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getUniversitiesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.universities,
    })
      .then((response) => {
        dispatch(getUniversities(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCoursesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.courses,
    })
      .then((response) => {
        dispatch(getCourses(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getCollegesList = (university_id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.colleges.replace('{university_id}', university_id),
    })
      .then((response) => {
        dispatch(getColleges(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getSpecialitiesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.specialities,
    })
      .then((response) => {
        dispatch(getSpecialities(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const getRegistrationCouncilList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.councilNames,
    })
      .then((response) => {
        dispatch(updateCouncilNames(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
