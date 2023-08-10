import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { cardCountDetails, dashboardTableData } from '../reducers/dashboard-reducers';

export const getCardCount = () => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.dashboard.cardCount,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
  let path = '';
  if (body.search !== undefined && body.search !== null && body.search !== '') {
    if (path === '') {
      path += 'search=' + body.search;
    } else {
      path += '&search=' + body.search;
    }
  }
  if (body.value !== undefined && body.value !== null && body.value !== '') {
    if (path === '') {
      path += 'value=' + body.value;
    } else {
      path += '&value=' + body.value;
    }
  }
  if (body.offset !== undefined && body.offset !== null && body.offset !== '') {
    if (path === '') {
      path += 'offset=' + body.offset;
    } else {
      path += '&offset=' + body.offset;
    }
  }
  if (body.page_no !== undefined && body.page_no !== null && body.page_no !== '') {
    if (path === '') {
      path += 'pageNo=' + body.page_no;
    } else {
      path += '&pageNo=' + body.page_no;
    }
  }
  if (body.nmr_id !== undefined && body.nmr_id !== null && body.nmr_id !== '') {
    if (path === '') {
      path += 'nmrId=' + body.nmr_id;
    } else {
      path += '&nmrId=' + body.nmr_id;
    }
  }
  if (
    body.work_flow_status_id !== undefined &&
    body.work_flow_status_id !== null &&
    body.work_flow_status_id !== ''
  ) {
    if (path === '') {
      path += 'workFlowStatusId=' + body.work_flow_status_id;
    } else {
      path += '&workFlowStatusId=' + body.work_flow_status_id;
    }
  }
  if (
    body.application_type_id !== undefined &&
    body.application_type_id !== null &&
    body.application_type_id !== ''
  ) {
    if (path === '') {
      path += 'applicationTypeId=' + body.application_type_id;
    } else {
      path += '&applicationTypeId=' + body.application_type_id;
    }
  }
  if (
    body.user_group_status !== undefined &&
    body.user_group_status !== null &&
    body.user_group_status !== ''
  ) {
    if (path === '') {
      path += 'userGroupStatus=' + body.user_group_status;
    } else {
      path += '&userGroupStatus=' + body.user_group_status;
    }
  }
  if (body.smc_id !== undefined && body.smc_id !== null && body.smc_id !== '') {
    if (path === '') {
      path += 'smcId=' + body.smc_id;
    } else {
      path += '&smcId=' + body.smc_id;
    }
  }
  if (body.name !== undefined && body.name !== null && body.name !== '') {
    if (path === '') {
      path += 'name=' + body.name;
    } else {
      path += '&name=' + body.name;
    }
  }

  if (body.sortBy !== undefined && body.sortBy !== null && body.sortBy !== '') {
    if (path === '') {
      path += 'sortBy=' + body.sortBy;
    } else {
      path += '&sortBy=' + body.sortBy;
    }
  }
  if (body.sortOrder !== undefined && body.sortOrder !== null && body.sortOrder !== '') {
    if (path === '') {
      path += 'sortOrder=' + body.sortOrder;
    } else {
      path += '&sortOrder=' + body.sortOrder;
    }
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.dashboard.cardDetails}?${path}`,
      // url: `${API.dashboard.cardDetails}?workFlowStatusId=${body.work_flow_status_id}&applicationTypeId=${body.application_type_id}&userGroupStatus=${body.user_group_status}&smcId=${body.smc_id}&name=${body.name}&nmrId=${body.nmr_id}&pageNo=${body.page_no}&size=${body.size}&search=${body.search}&sortBy=${body.sort_by}&sortOrder=${body.sort_order}`,
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('accesstoken') },
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
