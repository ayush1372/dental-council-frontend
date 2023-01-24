import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { cardCountDetails } from '../reducers/dashboard-reducers';

export const getCardCount = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.dashboard.cardCount,
      data,
    })
      .then((response) => {
        dispatch(cardCountDetails({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(cardCountDetails({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
