import { verboseLog } from '../../config/debug';
import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { getGenerateMobileOTP } from '../reducers/register-driving-licence-reducers';
// import { updateToken } from '../reducers/login-reducer';

export const generateMobileOTP = (body) => async (dispatch) => {
  dispatch(resetState.mobileOTP);
  const response = await dispatch(
    useAxiosCall(
      POST,
      'https://healthidbeta.ndhm.gov.in/api/v2/registration/mobile/generateOtp',
      body
    )
  );
  dispatch(getGenerateMobileOTP(response));
  verboseLog('generateMobileOTP', response);
};

const resetState = {
  mobileOTP: getGenerateMobileOTP({ data: [], isLoading: true, isError: null }),
};
