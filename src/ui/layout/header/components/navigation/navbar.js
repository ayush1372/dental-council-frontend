import './navbar.scss';

import { Fragment, useState } from 'react';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import Dropdown from './dropdown';

const Nav = ({ navLinks, menuToggleHandler }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const openDropdownHandler = (label) => {
    if (label === openDropdown) return setOpenDropdown(null);
    setOpenDropdown(label);
  };

  const onSelectCallback = () => {
    if (menuToggleHandler) menuToggleHandler();
    setOpenDropdown(null);
  };

  return (
    <Box
      className="navLinkContainer"
      display="flex"
      width="100%"
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems="center"
      bgcolor="primary.main"
      position="relative"
      px={{ xs: 0, md: 3 }}
    >
      {navLinks.map(({ label, link, tree }) => {
        const isOpen = openDropdown === label;
        return (
          <Fragment key={label}>
            {link ? (
              <NavLink className="navMenu" to={link}>
                <Typography variant="body3">{label}</Typography>
              </NavLink>
            ) : (
              <Box
                onClick={() => openDropdownHandler(label)}
                width={{ xs: '100%', md: 'auto' }}
                textAlign="left"
                position="relative"
              >
                {/* <NavLink to="/" className="navMenu" isOpen={isOpen}> */}
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  className="navMenu"
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
  navLinks: [
    {
      label: 'About NMR',
      link: '/about-us',
    },
    {
      label: 'NMR ACT',
      link: null,
      tree: [
        {
          label: 'Financial',
          link: '/financial',
          branches: null,
        },
        {
          label: 'Agro',
          link: '/agro',
          branches: null,
        },
        {
          label: 'Pricing',
          link: '/pricing',
          branches: null,
        },
      ],
    },

    {
      label: 'Rules & Regulations',
      link: '/rules-regulations',
      tree: null,
    },
    {
      label: 'Information Desk',
      link: '/information-desk',
      tree: null,
    },
    {
      label: 'Media Room',
      link: '/media-room',
      tree: null,
    },
    {
      label: 'E-Gazette',
      link: '/e-gazette',
      tree: null,
    },
    {
      label: 'Photo Gallery',
      link: '/photo-gallery',
      tree: null,
    },
    {
      label: 'Search Doctor',
      link: '/search-doctor',
      tree: null,
    },
  ],
};

export default Nav;
