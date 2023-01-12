import { useState } from 'react';

// import { SArrowIcon } from '../styles';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import styles from './dropdown.scss';

const TreeItem = ({ onSelectCallback, label, children, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      {link && (
        <NavLink to={link} onClick={onSelectCallback} className="test">
          <Typography
            color={{ xs: 'primary.main', md: 'white.main' }}
            variant="body3"
            borderBottom="1px solid"
            borderColor="primary.dark"
            borderRadius="0"
            component="div"
            p={1}
            px={2}
            backgroundColor={{ xs: 'grey.main', md: 'primary.main' }}
            sx={{
              '&:hover': {
                backgroundColor: 'primary.dark',
                color: 'white.main',
              },
            }}
          >
            {label}
          </Typography>
        </NavLink>
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
    </Box>
  );
};

const Dropdown = ({ tree, onSelectCallback }) => {
  const createTree = (branch) => (
    <TreeItem onSelectCallback={onSelectCallback} label={branch.label} link={branch.link}>
      {branch?.branches?.map((branch, index) => (
        <Typography key={index}>{createTree(branch)}</Typography>
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
      className={styles.submenu}
      boxShadow="1"
    >
      {tree.map((branch, index) => (
        <Typography key={index}> {createTree(branch)}</Typography>
      ))}
    </Box>
  );
};

export default Dropdown;
