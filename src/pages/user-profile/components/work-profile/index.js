import { useEffect, useMemo, useState } from 'react';

import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getProfileId } from '../../../../helpers/functions/common-functions';
import { getWorkProfileDetailsData } from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';
import ReadWorkProfile from './read-profile';

const WorkProfile = () => {
  const dispatch = useDispatch();
  const [isReadMode, setIsReadMode] = useState(true);

  const profile_id = useMemo(() => getProfileId(), []);

  useEffect(() => {
    dispatch(getWorkProfileDetailsData(profile_id)).catch((allFailMsg) => {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    });
  }, [profile_id]);

  const handleEdit = () => {
    setIsReadMode(true);
  };
  return <Container>{isReadMode && <ReadWorkProfile handleEdit={handleEdit} />}</Container>;
};

export default WorkProfile;
