import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProfileTabContainer({ DrawerOptions }) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { userActiveTab } = useSelector((state) => state.common);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '69%',
        flex: 1,
        borderRadius: '8px',
      }}
    >
      {DrawerOptions?.map((item, index) =>
        item.tabName === userActiveTab ? (
          <>
            {/* {userActiveTab === 'my-profile' && loggedInUserType === 'Doctor' ? (
              ''
            ) : (
              <Typography variant="h2" py={2} bgcolor={`${theme.palette.white.main}`} mb={1} px={3}>
                {item?.name}
              </Typography>
            )} */}
            <Box
              bgcolor={
                userActiveTab === 'my-profile' && loggedInUserType === 'Doctor'
                  ? ''
                  : `${theme.palette.white.main}`
              }
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
