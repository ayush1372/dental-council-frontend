import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getNMCProfile } from '../reducers/nmc-reducer';

export const getNMCProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.nmc.getNMCProfileData.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getNMCProfile({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getNMCProfile({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
