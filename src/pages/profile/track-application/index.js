import React from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { verboseLog } from '../../../config/debug';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import { Button, TextField } from '../../../ui/core';

export function TableSearch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'table-search-popover' : undefined;

  const loggedInUserType = useSelector((state) => state.login.loggedInUserType);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      filterByName: '',
      filterByRegNo: '',
    },
  });

  const onClickFilterButtonHandler = (data) => {
    verboseLog('data', data);
    reset({ filterByName: '', filterByRegNo: '' });
  };

  return (
    <Box data-testid="table-search">
      <Grid container>
        <Grid item md={2} xs={12} mb={1}>
          <Grid item md={12} xs={12}>
            <TextField
              data-testid="freesearch"
              inputProps={{ maxLength: 100 }}
              fullWidth={true}
              id="outlined-basic"
              variant="outlined"
              type="text"
              name="search"
              required="false"
              placeholder={'You can search anything here'}
              defaultValue={getValues().search}
              error={errors.search?.message}
              {...register('search')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ paddingRight: '3px' }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid item md={10} xs={12} mb={1}>
          <Grid container item spacing={1} justifyContent="flex-end">
            <Grid item md={3} xs={12}>
              <TextField
                data-testid="filterByName"
                inputProps={{ maxLength: 100 }}
                fullWidth={true}
                id="outlined-basic"
                variant="outlined"
                type="text"
                name="filterByName"
                required="false"
                placeholder={'Filter by Name'}
                defaultValue={getValues().filterByName}
                error={errors.filterByName?.message}
                {...register('filterByName')}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                data-testid="filterByRegNo"
                inputProps={{ maxLength: 100 }}
                fullWidth={true}
                id="outlined-basic"
                variant="outlined"
                type="text"
                name="filterByRegNo"
                required="false"
                placeholder={'Filter by Registration No.'}
                defaultValue={getValues().filterByRegNo}
                error={errors.filterByRegNo?.message}
                {...register('filterByRegNo')}
              />
            </Grid>
            {(loggedInUserType === 'College' || loggedInUserType === 'NMC') && (
              <Grid item md={3} xs={12}>
                <Box>
                  <SearchableDropdown
                    sx={{ height: 8 }}
                    name="RegistrationCouncil"
                    placeholder="Filter by Council"
                    items={[{ id: 1, name: 'first' }]}
                  />
                </Box>
              </Grid>
            )}

            <Grid item md={1} xs={12} mr={1}>
              <Button
                data-testid="filterButton"
                sx={{ padding: '13px 10px' }}
                variant="contained"
                onClick={handleSubmit(onClickFilterButtonHandler)}
              >
                Filter
              </Button>
            </Grid>
            <Grid item md={1} xs={12}>
              <Button
                data-testid="exportButton"
                sx={{ padding: '17px 10px' }}
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
                startIcon={
                  <FileUploadOutlinedIcon sx={{ fontSize: '26px', transform: 'rotate(90deg)' }} />
                }
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
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TableSearch;
