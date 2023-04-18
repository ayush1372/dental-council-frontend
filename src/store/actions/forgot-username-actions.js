import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getForgotUserName } from '../reducers/forgot-username-reducer';

export const retrieveUserName = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.forgotUserName.retrieveUser,
      data: data,
    })
      .then((response) => {
        dispatch(getForgotUserName(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
