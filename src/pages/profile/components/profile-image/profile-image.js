/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
// import { PhotoCamera } from '@material-ui/icons';
// import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import avtarImg from '../../../../assets/images/user.png';
import { getUserProfileImage } from '../../../../store/actions/common-actions';

// import { Button } from '../../../../ui/core';
import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const dispatch = useDispatch();
  // console.log('profile id==>', stateData);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    // console.log('clicked');
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('image==>', setImage(reader.result.toString()));
      // console.log('image and file==>', image);
    };
    reader.readAsDataURL(e.target.files[0]);
    // console.log(image.length,'length')
    if (image.length > 0) {
      console.log(image, '<===image');
    }
  };
  useEffect(() => {
    if (image.length > 0) {
      dispatch(getUserProfileImage(profileId, image));
    }
  }, [image]);

  console.log('image ==>', image); //image url
  console.log('file==>', file); // file converted to base64

  return (
    <Grid container className={styles.profileImageDetailsContainer}>
      <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
        <img
          alt="avtarImg"
          className={styles.profileImage}
          src={file === null ? avtarImg : file}
          data-testid="profileImg"
        />
        <input
          onChange={handleChange}
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: 'none' }}
        />

        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <EditIcon sx={{ mt: 7 }} />
          </IconButton>
        </label>
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography variant="subtitle2">{props.name}</Typography>
      </Grid>
    </Grid>
  );
}
