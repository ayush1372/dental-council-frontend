import { API } from '../../api/api-endpoints';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { cardCountDetails, dashboardTableData } from '../reducers/dashboard-reducers';

export const getCardCount = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.dashboard.cardCount,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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

export const getDashboardTableData = (body) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.dashboard.cardDetails,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
      data: body,
    })
      .then((response) => {
        dispatch(dashboardTableData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(dashboardTableData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
