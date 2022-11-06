import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { Cret } from '../reducers/captcha-reducers';

export const getCret = () => async (dispatch) => {
  dispatch(Cret({ data: [], isLoading: true, isError: null }));

  const response = await dispatch(
    useAxiosCall(GET, 'https://healthidsbx.abdm.gov.in/api/v2/auth/cert')
  );

  dispatch(Cret(response));
};
