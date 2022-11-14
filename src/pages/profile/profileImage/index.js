import { Grid, Typography } from '@mui/material';

import avtarImg from '../../../assets/images/user.png';

import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  return (
    <Grid container mt={0} spacing={1} className={styles.profileImageDetailsContainer}>
      <Grid item xs={12} display="flex" justifyContent="center" className={styles.imageContainer}>
        <img alt="avtarImg" className={styles.profileImage} src={avtarImg} />
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography className={styles.profileImageName}>
          {props.userType === 'professional' ? 'Dr.' : ''}
          {` ${props.name}`}
        </Typography>
      </Grid>
    </Grid>
  );
}
