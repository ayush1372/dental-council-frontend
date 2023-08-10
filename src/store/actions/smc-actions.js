import { API } from '../../api/api-endpoints';
import { GET, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getSMCProfile } from '../reducers/smc-reducer';

export const getSMCProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.smc.getSMCProfileData.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getSMCProfile({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getSMCProfile({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
export const getUpdatedsmcProfileData = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.smc.getSMCProfileData.replace('{id}', data.id),
      data: data,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getSMCProfile({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
