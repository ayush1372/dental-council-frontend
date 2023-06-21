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
        ) : (
          ''
        )
      )}
    </Box>
  );
}
