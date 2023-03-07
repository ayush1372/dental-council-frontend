// import { useTheme } from '@emotion/react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProfileTabContainer({ DrawerOptions }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.common);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '69%',
        // bgcolor:
        //   (userActiveTab === 'my-profile' && loggedInUserType === 'Doctor') ||
        //   (userActiveTab === 'New-doctor-registration' && loggedInUserType === 'SMC')
        //     ? 'none'
        //     : `${theme.palette.white.main}`,
        flex: 1,
        borderRadius: '8px',
      }}
    >
      {DrawerOptions?.map((item, index) =>
        item.tabName === userActiveTab ? (
          <>
            {userActiveTab === 'my-profile' && loggedInUserType === 'Doctor' ? (
              ''
            ) : (
              <Typography variant="h2" py={3} bgcolor={`${theme.palette.white.main}`} mb={2} px={3}>
                {item?.name}
              </Typography>
            )}
            <Box
              bgcolor={
                userActiveTab === 'my-profile' && loggedInUserType === 'Doctor'
                  ? ''
                  : `${theme.palette.white.main}`
              }
              // py={2}
              // px={3}
              minHeight={'550px'}
              key={index}
            >
              {item.element}
            </Box>
          </>
        ) : (
          ''
        )
      )}
    </Box>
  );
}
