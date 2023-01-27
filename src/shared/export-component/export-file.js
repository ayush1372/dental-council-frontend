import { useState } from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Grid, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material';

import { Button } from '../../ui/core';

const ExportFiles = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'table-search-popover' : undefined;
  return (
    <Grid item md={1} xs={12} data-testid="exportButton">
      <Button
        data-testid="exportButton"
        sx={{
          padding: '17px 10px',
          width: {
            xs: '100%',
            md: 'fit-content',
          },
        }}
        variant="contained"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        startIcon={<FileUploadOutlinedIcon sx={{ fontSize: '26px', transform: 'rotate(90deg)' }} />}
      ></Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton disablePadding>
              <ListItemText primary="Export as xlsx" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClose}>
              <ListItemText primary="Export as csv" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Grid>
  );
};

export default ExportFiles;
