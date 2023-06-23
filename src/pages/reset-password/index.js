import { Grid } from '@mui/material';

import NewPasswordSetup from '../login-page/components/new-password-setup';

export function ResetPassword() {
  return (
    <Grid container justifyContent={'center'} my={3}>
      <NewPasswordSetup loginName="Doctor" />
    </Grid>
  );
}

export default ResetPassword;
