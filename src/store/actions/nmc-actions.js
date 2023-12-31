import { API } from '../../api/api-endpoints';
import { GET, PUT } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getCollegeApproval, getNMCProfile } from '../reducers/nmc-reducer';

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

export const getCollegeApprovalData = (data) => async (dispatch) => {
  let path = '';
  if (data.pageNo !== undefined && data.pageNo !== null && data.pageNo !== '') {
    if (path === '') {
      path += 'pageNo=' + data.pageNo;
    } else {
      path += '&pageNo=' + data.pageNo;
    }
  }
  if (data.offset !== undefined && data.offset !== null && data.offset !== '') {
    if (path === '') {
      path += 'offset=' + data.offset;
    } else {
      path += '&offset=' + data.offset;
    }
  }
  if (data.search !== undefined && data.search !== null && data.search !== '') {
    if (path === '') {
      path += 'search=' + data.search;
    } else {
      path += '&search=' + data.search;
    }
  }
  if (data.id !== undefined && data.id !== null && data.id !== '') {
    if (path === '') {
      path += 'id=' + data.id;
    } else {
      path += '&id=' + data.id;
    }
  }
  if (data.name !== undefined && data.name !== null && data.name !== '') {
    if (path === '') {
      path += 'name=' + data.name;
    } else {
      path += '&name=' + data.name;
    }
  }
  if (data.council !== undefined && data.council !== null && data.council !== '') {
    if (path === '') {
      path += 'council=' + data.council;
    } else {
      path += '&council=' + data.council;
    }
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.nmc.collegeApproval}?${path}`,

      // url:API.nmc.collegeApproval +
      //   `?pageNo=${data.pageNo}&limit=${data.limit}&search=${data.search}&id=${data.id}&name=${data.name}&council=${data.council}`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeApproval({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCollegeApproval({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
export const getUpdatedNmcProfileData = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: PUT,
      url: API.nmc.getNMCProfileData.replace('{id}', data.id),
      data: data,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getNMCProfile({ data: response.data, isError: false, isLoading: false }));

        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
