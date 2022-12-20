import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getDistricts, getStates } from '../reducers/menu-lists-reducer';

export const getStatesList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.menuLists.states,
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

export const getDistrictList = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.menuLists.districts,
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
