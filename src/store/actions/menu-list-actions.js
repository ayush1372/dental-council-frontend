import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getStates } from '../reducers/menu-lists-reducer';

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
