import { API } from '../../../../api/api-endpoints';
import { GET } from '../../../../constants/requests';
import { useAxiosCall } from '../../../../hooks/use-axios';

export const getAdditionalCollegesList = (selectedState) => async () => {
  let path = '';
  if (selectedState !== undefined && selectedState !== null && selectedState !== '') {
    path = '?stateId=' + selectedState;
  }
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.colleges}${path}`,
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

export const getAdditionalUniversitiesList = (selectedCollegeID) => async () => {
  let path = '';
  if (selectedCollegeID !== undefined && selectedCollegeID !== null && selectedCollegeID !== '') {
    path += 'collegeId=' + selectedCollegeID;
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.common.universities}?${path}`,
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
