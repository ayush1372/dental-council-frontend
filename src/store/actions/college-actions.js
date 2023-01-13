import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getCollegeData } from '../reducers/college-reducer';

export const getCollegeProfileData = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.college.getCollegeProfile.replace('{id}', id),
      // data: {},
      headers: { Authorization: localStorage.getItem('accesstoken') },
    })
      .then((response) => {
        dispatch(getCollegeData({ data: response.data, isError: false, isLoading: false }));
        return resolve(response);
      })
      .catch((error) => {
        dispatch(getCollegeData({ data: [], isError: true, isLoading: false }));
        return reject(error);
      });
  });
};
