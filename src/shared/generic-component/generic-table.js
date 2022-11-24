import { Box, Link, TableSortLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import Moment from 'moment';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

// import { useSelector } from 'react-redux';

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
};

export default function GenericTable(props) {
  const { userActiveTab } = useSelector((state) => state.ui);
  // const { isLoggedInUserType } = useSelector((state) => state.recruiter);
  const tableCellWidth = Math.floor(window.innerWidth / props.tableHeader.length) + 'px';
  const { order, orderBy, onRequestSort, page, rowsPerPage } = props;
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy]?.value < a[orderBy]?.value) {
      return -1;
    }
    if (b[orderBy]?.value > a[orderBy]?.value) {
      return 1;
    }
    return 0;
  }
  function descendingDateComparator(a, b, orderBy) {
    const dateB = new Date(
      Moment(b[orderBy].value, 'DD-MM-YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss')
    );
    const dateA = new Date(
      Moment(a[orderBy].value, 'DD-MM-YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss')
    );
    return dateB.getTime() - dateA.getTime();
  }
  function getComparator(order, orderBy) {
    if (orderBy.type === 'date') {
      return order === 'desc'
        ? (a, b) => descendingDateComparator(a, b, orderBy.name)
        : (a, b) => -descendingDateComparator(a, b, orderBy.name);
    } else {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy.name)
        : (a, b) => -descendingComparator(a, b, orderBy.name);
    }
  }

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            {props.tableHeader.map((item, index) => {
              // if (item.title === 'action') {
              //   return <TableCell key={index} align="left" />;
              // } else
              if (item.sorting) {
                return (
                  <TableCell
                    sx={{ fontSize: '13px', color: 'white.main' }}
                    key={index}
                    align="left"
                    sortDirection={orderBy.name === item.name ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy.name === item.name}
                      direction={orderBy.name === item.name ? order : 'asc'}
                      onClick={createSortHandler(item)}
                    >
                      {item.title}
                      {orderBy.name === item.name ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{ fontSize: '13px', color: 'white.main' }}
                  >
                    {item.title}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(props.data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow
                maxWidth={'100px'}
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // className={!row.read.value ? 'style-bold' : ''}
                // onClick={() => props.handleRowClick(row)}
              >
                {props.tableHeader.map((item, index) => {
                  if (item.title === 'View') {
                    return (
                      <TableCell
                        sx={{ fontSize: '13px' }}
                        maxWidth={`${tableCellWidth}%`}
                        key={index}
                        align="left"
                      >
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
                  } else if (
                    item.title === 'Name of Applicant' &&
                    userActiveTab === 'track-status'
                  ) {
                    return (
                      <TableCell
                        sx={{ fontSize: '13px' }}
                        maxWidth={`${tableCellWidth}%`}
                        key={index}
                        align="left"
                      >
                        <Link
                          href="/profile"
                          onClick={(event) => row[item.name]?.callbackNameOfApplicant(event, row)}
                        >
                          {row[item.name]?.value}
                        </Link>

                        {/* <Button
                          onClick={(event) => row[item.name]?.callbackNameOfApplicant(event, row)}
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: 'secondary.main',
                          }}
                        >
                          {row[item.name]?.value}
                        </Button> */}
                      </TableCell>
                    );
                  } else {
                    return (
                      <Tooltip key={index} title={row[item.name]?.value}>
                        <TableCell
                          key={index}
                          // title={row[item.name]?.value}
                          className={row.read?.value === false ? 'style-bold' : ''}
                          sx={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            maxWidth: '112px',
                            overflow: 'hidden',
                            fontSize: '13px',
                            //fontWeight: '500'
                          }}
                          align="left"
                        >
                          {row[item.name]?.value}
                        </TableCell>
                      </Tooltip>
                    );
                  }
                })}
              </TableRow>
            ))}
          {props.data?.length === 0 ? 'No Result Found' : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
