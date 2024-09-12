import { useState } from 'react';

import { Box, Grid, Tab, Tabs } from '@mui/material';

// import ProfileConsent from '../profile-consent/profile-consent';
// import { useTranslation } from 'react-i18next';
import ReadPersonalDetails from '../read-personal-details/read-personal-details';
import ReadRegisterAndAcademicDetails from '../read-register-and-academic-details/read-register-and-academic-details';
import ReadWorkProfile from '../read-work-profile/read-work-profile';

const ReviewAllForms = () => {
  const [tabValue, setTabValue] = useState(0);

  // const onHandleOptionNext = () => {
  //   handleNext();
  // };

  const handleTabChange = (_, value) => {
    setTabValue(value);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Tabs
          orientation="vertical"
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            width: '268px',
            '.MuiButtonBase-root': {
              alignItems: 'flex-start',
              color: 'tabDefaultTextColor.main',
              borderLeft: '4px solid',
              borderLeftColor: 'grey.main',
              textTransform: 'capitalize',
              '&.Mui-selected': {
                color: 'white.main',
                backgroundColor: 'primary.main',
                borderLeft: '4px solid',
                borderLeftColor: 'secondary.main',
              },
            },
          }}
        >
          <Tab label="Personal Details" />
          <Tab label="Registration & Academic Details" />
          <Tab label="Work Details" />
        </Tabs></Grid>
      <Grid item xs={12} sm={9}>
        {tabValue === 0 && <ReadPersonalDetails showActions={false} />}
        {tabValue === 1 && <ReadRegisterAndAcademicDetails showActions={false} />}
        {tabValue === 2 && <ReadWorkProfile showActions={false} />}
      </Grid>
    </Grid>

  );
};
export default ReviewAllForms;
