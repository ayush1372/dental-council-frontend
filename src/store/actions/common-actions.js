import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import {
  getCountries,
  getDistricts,
  getRegistrationCouncil,
  getStates,
  getSubDistricts,
  getUniversity,
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
export const getRegistrationCouncilList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.getCouncilNames,
    })
      .then((response) => {
        dispatch(getRegistrationCouncil(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
export const getUniversityList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.getUniversityNames,
    })
      .then((response) => {
        dispatch(getUniversity(response.data));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
