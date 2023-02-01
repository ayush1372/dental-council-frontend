import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Typography } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import avtarImg from '../../../../assets/images/user.png';
import { getUserProfileImage } from '../../../../store/actions/common-actions';

import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const profileImage = useSelector((state) => state.common.profileImage.data.profile_picture);
  const dispatch = useDispatch();
  const [imageChanged, setImageChanged] = useState(false);
  const [imageTypeError, setImageTypeError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState('');

  const changeImage = (e) => {
    const requestObjNew = new FormData();
    if (
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/jpg' ||
      e.target.files[0].type === 'image/png'
    ) {
      if (e.target.files[0].size > 5000000) {
        setImageChanged(!imageChanged);
        setImageErrorMessage('Maximum allowed file size is 5MB');
        setImageTypeError(true);
      } else {
        setImageTypeError(false);
        requestObjNew.append('file', e.target.files[0]);
        dispatch(getUserProfileImage(profileId, requestObjNew));
        setImageChanged(!imageChanged);
      }
    } else {
      setImageChanged(!imageChanged);
      setImageErrorMessage('Allowed file types are JPEG/PNG');
      setImageTypeError(true);
    }
  };

  return (
    <Grid container className={styles.profileImageDetailsContainer}>
      <Grid item xs={12} mt={2}>
        <FormGroup className="update-image">
          <Box>
            <img
              src={profileImage ? 'data:image/*;base64,' + profileImage : avtarImg}
              className={styles.profileImage}
              alt="image"
            />
          </Box>
        </FormGroup>
        {imageTypeError && imageErrorMessage}

        <input
          type="file"
          id="icon-button-file"
          accept=" image/jpeg, image/jpg, image/png"
          onChange={(event) => changeImage(event)}
          style={{ display: 'none' }}
        />
        <span>
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <EditIcon sx={{ ml: 15 }} />
            </IconButton>
          </label>
        </span>
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography variant="subtitle2">{props.name}</Typography>
      </Grid>
    </Grid>
  );
}
