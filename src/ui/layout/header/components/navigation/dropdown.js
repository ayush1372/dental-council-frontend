import { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const TreeItem = ({ onSelectCallback, label, children, link }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    submenu: {
      zIndex: '9',
      padding: '16px',
      width: '100%',
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.primary.dark,
      '&.active': {
        backgroundColor: theme.palette.primary.dark,
      },
      [theme.breakpoints.down('md')]: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.grey.main,
        '&.active': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.grey.main,
        },
      },
    },
  }));
  const classes = useStyles(theme);

  return (
    <>
      {link && (
        <Box
          display="flex"
          backgroundColor={{ xs: 'grey.main', md: 'primary.main' }}
          sx={{
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: 'white.main',
            },
          }}
        >
          <NavLink to={link} onClick={onSelectCallback} className={classes.submenu}>
            {label}
          </NavLink>
        </Box>
      )}
      {!link && (
        <Box
          display="flex"
          justifyContent="center"
          alignitems="center"
          cursor="pointer"
          onClick={() => setIsOpen((p) => !p)}
        >
          <Typography component="span" isOpen={isOpen} color="white.main">
            {label}
          </Typography>
          <Box isOpen={isOpen}>
            <KeyboardArrowDownOutlinedIcon />
          </Box>
        </Box>
      )}
      {children && isOpen && <Box mt={1}>{children}</Box>}
    </>
  );
};

const Dropdown = ({ tree, onSelectCallback }) => {
  const createTree = (branch) => (
    <TreeItem onSelectCallback={onSelectCallback} label={branch.label} link={branch.link}>
      {branch?.branches?.map((branch, index) => (
        <Fragment key={index}>{createTree(branch)}</Fragment>
      ))}
    </TreeItem>
  );

  return (
    <Box
      whiteSpace="nowrap"
      position={{ xs: 'relative', md: 'absolute' }}
      top="100%"
      left="0"
      bgcolor="primary.main"
      width={{ xs: '100%', md: '200px' }}
      boxShadow="1"
      zIndex="9"
    >
      {tree.map((branch, index) => (
        <Typography key={index}> {createTree(branch)}</Typography>
      ))}
    </Box>
  );
};

export default Dropdown;
