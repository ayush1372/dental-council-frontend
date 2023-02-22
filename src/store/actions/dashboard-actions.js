import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
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
      method: GET,
      url: `${API.dashboard.cardDetails}?workFlowStatusId=${body.work_flow_status_id}&applicationTypeId=${body.application_type_id}&userGroupStatus=${body.user_group_status}&smcId=${body.smc_id}&name=${body.name}&nmrId=${body.nmr_id}&pageNo=${body.page_no}&size=${body.size}&search=${body.search}&sortBy=${body.sort_by}&sortOrder=${body.sort_order}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
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
