import { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { navbar_routes } from '../../../../../constants/navigation-meta';
import { menuToggle } from '../../../../../store/reducers/nav-menu-reducer';
import Dropdown from './dropdown';
const Nav = ({ menuToggleHandler }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();

  const useStyles = makeStyles(() => ({
    navMenu: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      padding: '14px 20px 10px',
      lineHeight: '1',
      borderBottom: '4px solid',
      borderBottomColor: theme.palette.primary.main,
      borderRight: '1px solid',
      borderRightColor: theme.palette.primary.dark,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        borderBottom: '4px solid',
        borderBottomColor: theme.palette.secondary.main,
      },

      '&.active': {
        backgroundColor: theme.palette.primary.dark,
        borderBottom: '4px solid',
        borderBottomColor: theme.palette.secondary.main,
      },

      [theme.breakpoints.down('lg')]: {
        padding: '12px',
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRight: '0',
        borderBottom: '0',
        '&:hover': {
          backgroundColor: 'none',
          borderBottom: 'none',
        },
        '&.active': {
          backgroundColor: 'none',
          borderBottom: 'none',
        },
      },
    },
    search: {
      backgroundColor: theme.palette.primary.dark,
      borderBottom: `4px solid ${theme.palette.primary.dark}`,
      marginLeft: 'auto',
      borderRight: 0,

      '&.active': {
        backgroundColor: theme.palette.secondary.main,
        borderBottom: '4px solid',
        borderBottomColor: theme.palette.secondary.main,
      },
    },
  }));

  const classes = useStyles(theme);

  const openDropdownHandler = (label) => {
    if (window.innerWidth <= 1024) {
      if (label === openDropdown) return setOpenDropdown(null);
      setOpenDropdown(label);
    }
  };

  const hoverEffect = (label) => {
    if (window.innerWidth >= 1023) {
      if (label === openDropdown) return setOpenDropdown(null);
      setOpenDropdown(label);
    }
  };

  const hoverOutEffect = () => {
    if (window.innerWidth >= 1023) {
      setOpenDropdown(null);
    }
  };

  const onSelectCallback = () => {
    if (menuToggleHandler) menuToggleHandler();
    setOpenDropdown(null);
    dispatch(menuToggle(!menuOpen));
  };

  const { menuOpen } = useSelector((state) => state.navMenu);

  return (
    <Box
      className="navLinkContainer"
      display={{ xs: menuOpen ? 'flex' : 'none', md: 'flex' }}
      width="100%"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      bgcolor="primary.main"
      position="relative"
      px={{ xs: 0, md: 3 }}
    >
      {navbar_routes.map(({ label, link, tree, search }) => {
        const isOpen = openDropdown === label;
        return (
          <Fragment key={label}>
            {link ? (
              <NavLink
                className={clsx(classes.navMenu, {
                  [classes.search]: search,
                })}
                to={link}
                onClick={() => {
                  dispatch(menuToggle(!menuOpen));
                }}
              >
                {search ? <SearchOutlinedIcon fontSize="small" sx={{ marginRight: 1 }} /> : ''}
                <Typography variant="body3">{label}</Typography>
              </NavLink>
            ) : (
              <Box
                onClick={() => openDropdownHandler(label)}
                width={{ xs: '100%', md: 'auto' }}
                textAlign="left"
                position="relative"
                onMouseEnter={() => hoverEffect(label)}
                onMouseLeave={() => hoverOutEffect(null)}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  className={classes.navMenu}
                  gap={1}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography component="a" variant="body3">
                    {label}
                  </Typography>
                  <KeyboardArrowDownOutlinedIcon color="white" sx={{ fontSize: '16px' }} />
                </Box>
                {/* </NavLink> */}
                {isOpen && <Dropdown tree={tree} onSelectCallback={onSelectCallback} />}
              </Box>
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

Nav.defaultProps = {
  navbar_routes,
};

export default Nav;
