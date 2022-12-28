import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProfileTabContainer({ DrawerOptions }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.common);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '69%',
        bgcolor:
          (userActiveTab === 'my-profile' && loggedInUserType === 'Doctor') ||
          (userActiveTab === 'New-doctor-registration' && loggedInUserType === 'SMC')
            ? 'none'
            : `${theme.palette.white.main}`,
        flex: 1,
        borderRadius: '8px',
      }}
    >
      {DrawerOptions?.map((item, index) =>
        item.tabName === userActiveTab ? <Box key={index}>{item.element}</Box> : ''
      )}
    </Box>
  );
}
