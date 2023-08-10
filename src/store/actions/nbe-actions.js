import { API } from '../../api/api-endpoints';
import { GET, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getNBEData } from '../reducers/nbe-reducers';

export const getNBEProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.nbe.getNBEProfileData.replace('{id}', id),
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getNBEData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getNBEData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};

export const getUpdatedNBEProfileData = (data, id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.nbe.getNBEProfileData.replace('{id}', id),
      data: data,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getNBEData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getNBEData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
