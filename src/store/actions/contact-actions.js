import { API } from '../../api/api-endpoints';
import { verboseLog } from '../../config/debug';
import { GET, POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { updateToken, updateUserList } from '../reducers/contact-reducer';
// import { updateToken } from '../reducers/login-reducer';

export const getUserApi = () => async (dispatch) => {
  dispatch(resetState.userlist);

  const response = await dispatch(useAxiosCall(GET, API.contactUs));
  dispatch(updateUserList(response));
};

export const postLogin = (body) => async (dispatch) => {
  dispatch(resetState.logintoken);

  const response = await dispatch(useAxiosCall(POST, 'https://reqres.in/api/posts', body));
  dispatch(updateToken(response));
};

export const signup = (body) => async (dispatch) => {
  const response = await dispatch(useAxiosCall(POST, API.createUser, body));
  verboseLog('Signup Response', response);
  return response;
};

const resetState = {
  userlist: updateUserList({ data: [], isLoading: true, isError: null }),
  logintoken: updateToken({ data: [], isLoading: true, isError: null }),
};
