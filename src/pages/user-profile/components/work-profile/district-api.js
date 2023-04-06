import { API } from '../../../../api/api-endpoints';
import { GET } from '../../../../constants/requests';
import { useAxiosCall } from '../../../../hooks/use-axios';

export const getFacilityDistrictList = (stateId) => async () => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.common.districts.replace('{state_id}', stateId),
    })
      .then((response) => {
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
