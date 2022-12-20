import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { updateCities } from '../reducers/personal-details-reducer';

export const getCities = () => async (dispatch) => {
  const response = await dispatch(useAxiosCall(GET, API.cities));
  dispatch(updateCities(response));
};
