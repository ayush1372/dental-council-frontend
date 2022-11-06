import { useState } from 'react';

import { Box, Menu as MuiMenu, MenuItem as MuiMenuItem, StyledEngineProvider } from '@mui/material';
import CN from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Button } from '../button/button';
import { SvgImageComponent } from '../svg-icons';

import styles from './menu.module.scss';

export const Menu = ({ children, options, ...prop }) => {
  const dropdown = prop.dropdown;
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  // const handleMenuItemClick = (url, index) => {
  //   setSelectedIndex(index);
  //   navigate(url);
  // };

  const handleTab = (_e, url, index, redirect = false) => {
    setCurrentIndex(index);
    if (redirect) {
      window.open(url, '_blank');
    } else {
      navigate(url);
    }
  };

  return dropdown ? (
    <StyledEngineProvider injectFirst>
      <>
        <Button
          id="basic-button"
          menuButton
          color="primary"
          variant="contained"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          // onMouseOver={handleClick}
          endIcon={<SvgImageComponent color="primary" icon="keyboardDown" />}
        >
          {children}
        </Button>
        <MuiMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            disablePadding: true,
          }}
        >
          <div onMouseLeave={handleClose}>
            {options.map((item, index) => (
              <Box key={index} className={styles.menuList}>
                <MuiMenuItem
                  className={CN(styles.submenu, {
                    [styles.active]: index === currentIndex,
                  })}
                  // onClick={() => navigate(item.url)}
                  onClick={(e) => handleTab(e, item.url, index, item?.redirect)}
                  {...prop}
                >
                  {item.title}
                </MuiMenuItem>
              </Box>
            ))}
          </div>
        </MuiMenu>
      </>
    </StyledEngineProvider>
  ) : (
    <StyledEngineProvider injectFirst>
      <Button
        id="basic-button"
        menuButton
        color="primary"
        variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={() => navigate(prop.url)}
        // onMouseOver={() => setActive(children.index)}
        // className={active === children.index ? 'active' : ''}
      >
        {children}
      </Button>
      <MuiMenu></MuiMenu>
    </StyledEngineProvider>
  );
};
