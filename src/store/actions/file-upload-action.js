import { POST } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import useConfiguration from '../../hooks/use-configuration';
import { uploadDocumentState } from '../reducers/file-upload-reducer';

export const uploadDocumentAction = (body) => async (dispatch) => {
  const { config } = useConfiguration();
  //TODO static api used
  const response = await dispatch(useAxiosCall(POST, config.env.apiURL + '/api/upload', body));
  dispatch(uploadDocumentState(response));
};
