import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { updateCountries } from '../reducers/user-profile-reducer';

export const getCountries = () => async (dispatch) => {
  const response = await dispatch(useAxiosCall(GET, API.menuLists.countries));
  dispatch(updateCountries(response));
};
