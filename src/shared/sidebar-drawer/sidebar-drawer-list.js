import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function SideDrawerList({ handleSwitch, DrawerOptions, ActiveOption, open }) {
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const theme = useTheme();
  return (
    <List sx={{ p: 0 }}>
      {DrawerOptions?.map((item, index) => (
        <ListItem
          key={`profileOption_${index}`}
          id={`profileOption_${index}`}
          disablePadding
          sx={{
            display: 'block',
            borderLeft:
              item.tabName === ActiveOption
                ? `5px solid ${theme.palette.secondary.lightOrange}`
                : null,
            borderBottom: `1px solid ${theme.palette.inputBorderColor.main}`,
            '&:first-child': {
              borderTop: `1px solid ${theme.palette.inputBorderColor.main}`,
            },
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => {
              handleSwitch(item.tabName);
            }}
            disabled={
              personalDetails?.nmr_id?.length === undefined &&
              (item.tabName === 'voluntary-suspend-license' ||
                item.tabName === 'additional-qualifications' ||
                item.tabName === 'work-details')
                ? true
                : false
            }
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color:
                  item.tabName === ActiveOption
                    ? theme.palette.secondary.lightOrange
                    : theme.palette.grey1.main,
              }}
            >
              {!open ? item.icon : null}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{ variant: 'body3' }}
              sx={{
                opacity: open ? 1 : 0,
                color:
                  item.tabName === ActiveOption
                    ? theme.palette.secondary.lightOrange
                    : theme.palette.textPrimary.main,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
