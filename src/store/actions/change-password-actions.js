import { API } from '../../api/api-endpoints';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { setNewPassword } from '../reducers/change-password-reducers';

export const changePasswordData = (data) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: POST,
      url: API.common.changePassword,
      data: data,
    })
      .then((response) => {
        dispatch(setNewPassword(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
