import * as React from 'react';
import { useState } from 'react';

import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { Box, Link, Paper, Table, TableSortLabel, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SuspendValuntaryPopup from '../../pages/suspend-valuntary-popup';
import { Button, Chip } from '../../ui/core';

GenericTable.propTypes = {
  tableHeader: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
  handleRowClick: propTypes.func,
  onRequestSort: propTypes.func.isRequired,
  order: propTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: propTypes.object.isRequired,
  page: propTypes.number.isRequired,
  rowsPerPage: propTypes.number.isRequired,
  handleCellClick: propTypes.func,
  noRecordFound: propTypes.string,
};

export default function GenericTable(props) {
  const { userActiveTab } = useSelector((state) => state.common);
  const tableCellWidth = Math.floor(window.innerWidth / props.tableHeader.length) + 'px';
  const { order, orderBy, onRequestSort, customPopupOptions } = props;
  const [selected, setSelected] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedSuspendLicenseProfile, setSelectedSuspendLicenseProfile] = useState();

  const selectionChangeHandler = (event, row) => {
    const { myValue } = event.currentTarget.dataset;
    setSelected(myValue);
    setConfirmationModal(true);
    setSelectedSuspendLicenseProfile(row);
  };
  const [popUpOptions] = useState([
    {
      keyName: 'Suspend Permanently',
      dataValue: 'suspend',
      onClick: selectionChangeHandler,
    },
    {
      keyName: 'Suspend Temporarily',
      dataValue: 'blacklist',
      onClick: selectionChangeHandler,
    },
  ]);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const handleClose = () => {
    setConfirmationModal(false);
  };

  return (
    <TableContainer component={Paper}>
      <SuspendValuntaryPopup
        selected={selected}
        confirmationModal={confirmationModal}
        handleClose={handleClose}
        selectedSuspendLicenseProfile={selectedSuspendLicenseProfile}
      />
      <Table aria-label="table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            {props.tableHeader.map((item, index) => {
              if (item.sorting) {
                return (
                  <TableCell
                    sx={{ color: 'white.main' }}
                    key={index}
                    align="left"
                    sortDirection={orderBy.name === item.name ? order : false}
                  >
                    {item.title === 'Pendency (Days)' ? (
                      <TableSortLabel
                        active={orderBy.name === item.name}
                        direction={orderBy.name === item.name ? order : 'asc'}
                        onClick={createSortHandler(item)}
                        sx={{ color: 'white.main', width: '90px !important' }}
                      >
                        {item.title}
                        {orderBy.name === item.name ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      <TableSortLabel
                        active={orderBy.name === item.name}
                        direction={orderBy.name === item.name ? order : 'asc'}
                        onClick={createSortHandler(item)}
                        sx={{ color: 'white.main', width: 'max-content !important' }}
                      >
                        {item.title}
                        {orderBy.name === item.name ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    )}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{ color: 'white.main', width: 'max-content !important' }}
                  >
                    {item.title}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data?.map((row, rowIndex) => (
            <TableRow
              maxWidth={'100px'}
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.tableHeader.map((item, index) => {
                if (item.title === 'View') {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Button
                        onClick={(event) => row[item.name]?.onClickCallback(event, row)}
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: 'secondary.main',
                        }}
                      >
                        {row[item.name]?.value}
                      </Button>
                    </TableCell>
                  );
                }
                if (item.title === 'Request ID' && userActiveTab === 'dashboard') {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Link
                        sx={{ cursor: 'pointer' }}
                        onClick={(event) => row[item.name]?.onClickCallback(event, row)}
                      >
                        {row[item.name]?.value}
                      </Link>
                    </TableCell>
                  );
                } else if (
                  (item.title === 'Applicant Name' || item.title === 'Applicant Name') &&
                  userActiveTab !== 'dashboard'
                ) {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Link
                        href="/profile"
                        onClick={(event) => row[item.name]?.callbackNameOfApplicant(event, row)}
                      >
                        {row[item.name]?.value}
                      </Link>
                    </TableCell>
                  );
                } else if (
                  (item.title === 'Action' || item.title === 'Request NMC') &&
                  (userActiveTab === 'track-status' || userActiveTab === 'Activate Licence')
                ) {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <Button
                              endIcon={<MoreVertSharpIcon />}
                              variant="contained"
                              {...bindTrigger(popupState)}
                              sx={{
                                width: 'max-content',
                                backgroundColor: 'inherit',
                                color: 'black.main',
                                '&:hover': {
                                  backgroundColor: 'inherit',
                                },
                              }}
                            ></Button>
                            <Menu {...bindMenu(popupState)}>
                              {(customPopupOptions || popUpOptions).map((option) => {
                                return (
                                  <MenuItem
                                    key={option.dataValue}
                                    data-my-value={option.dataValue}
                                    onClick={(e) =>
                                      option?.onClick(e, row, option.dataValue) ||
                                      selectionChangeHandler(e, row)
                                    }
                                    disabled={
                                      customPopupOptions !== undefined
                                        ? row['NMCVerificationStatus']?.value === 'Blacklisted' ||
                                          row['NMCVerificationStatus']?.value === 'Suspended' ||
                                          row['councilVerificationStatus']?.value ===
                                            'Blacklisted' ||
                                          (props?.applicationData &&
                                            (props?.applicationData[rowIndex]?.doctor_status ===
                                              'Blacklisted' ||
                                              props?.applicationData[rowIndex]?.doctor_status ===
                                                'Suspended'))
                                        : row['NMRID']?.value === '' ||
                                          row['NMRID']?.value === undefined
                                    }
                                  >
                                    {option.keyName}
                                  </MenuItem>
                                );
                              })}
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </TableCell>
                  );
                } else if (item.title === 'Current Status') {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Chip
                        sx={{ width: '120px' }}
                        type={
                          row[item.name]?.value === 'Submitted'
                            ? 'submitted'
                            : row[item.name]?.value === 'PENDING'
                            ? 'pending'
                            : row[item.name]?.value === 'REJECTED'
                            ? 'reject'
                            : row[item.name]?.value === 'QUERY RAISED'
                            ? 'queryRaised'
                            : row[item.name]?.value === 'SUSPENDED'
                            ? 'suspended'
                            : 'approved'
                        }
                        label={row[item.name]?.value}
                      />
                    </TableCell>
                  );
                } else if (
                  item.title === 'Action' &&
                  (userActiveTab === 'track-application' || userActiveTab === 'dashboard')
                ) {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: 'secondary.main',
                        }}
                        onClick={(event) => row[item.name]?.onClickCallback(event, row)}
                      >
                        {row[item.name]?.value}
                      </Button>
                    </TableCell>
                  );
                } else if (
                  (item.title === 'Department' && item.flag !== 'declareFacility') ||
                  (item.title === 'Designation' && item.flag !== 'declareFacility') ||
                  item.title === 'Select'
                ) {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Typography
                        p={1}
                        component="div"
                        variant="subtitle"
                        onClick={() => row[item.name]?.onClickCallback(rowIndex)}
                        onChange={() => row[item.name]?.onClickCallback(rowIndex)}
                      >
                        {row[item.name]?.value}
                      </Typography>
                    </TableCell>
                  );
                } else if (
                  (item.title === 'Department' && item.flag === 'declareFacility') ||
                  (item.title === 'Designation' && item.flag === 'declareFacility')
                ) {
                  return (
                    <Tooltip key={index} title={row[item.name]?.value}>
                      <TableCell
                        key={index}
                        className={row.read?.value === false ? 'style-bold' : ''}
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '112px',
                          overflow: 'hidden',
                        }}
                        align="left"
                      >
                        {row[item.name]?.value}
                      </TableCell>
                    </Tooltip>
                  );
                } else if (item.title === 'Status' && userActiveTab === 'work-details') {
                  return (
                    <TableCell maxWidth={`${tableCellWidth}%`} key={index} align="left">
                      <Button
                        onClick={() => row[item.name]?.onClickCallback(rowIndex)}
                        variant="contained"
                        color="secondary"
                        size="small"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  );
                } else if (item.title === 'S.No.' || item.title === 'Pendency (Days)') {
                  return (
                    <TableCell
                      key={index}
                      className={row.read?.value === false ? 'style-bold' : ''}
                      align="center"
                      sx={{
                        width: '5em',
                      }}
                    >
                      {row[item.name]?.value}
                    </TableCell>
                  );
                } else {
                  return (
                    <Tooltip
                      key={index}
                      title={
                        item?.name === 'attachments'
                          ? row[item.name]?.iconToolTip
                          : row[item.name]?.value
                      }
                    >
                      <TableCell
                        key={index}
                        className={row.read?.value === false ? 'style-bold' : ''}
                        sx={{
                          whiteSpace: 'break-spaces',
                        }}
                        align={item?.name === 'attachments' ? 'center' : 'left'}
                      >
                        {row[item.name]?.value}
                      </TableCell>
                    </Tooltip>
                  );
                }
              })}
            </TableRow>
          ))}
          {props.data?.length === 0 ? (
            <TableRow sx={{ textAlign: 'center' }}>
              <TableCell colSpan="100%" align="center">
                <Box display="flex" justifyContent="center" width="100%">
                  {props.noRecordFound ? props.noRecordFound : 'No Result Found'}
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            ''
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
