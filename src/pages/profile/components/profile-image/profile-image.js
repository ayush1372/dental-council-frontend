import { Grid, Typography } from '@mui/material';

import avtarImg from '../../../../assets/images/user.png';

import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  return (
    <Grid container className={styles.profileImageDetailsContainer}>
      <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
        <img
          alt="avtarImg"
          className={styles.profileImage}
          src={avtarImg}
          data-testid="profileImg"
        />
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography variant="subtitle2">{props.name}</Typography>
      </Grid>
    </Grid>
  );
}
