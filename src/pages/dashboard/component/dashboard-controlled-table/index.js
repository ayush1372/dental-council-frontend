import React from 'react';

import { Grid, TablePagination } from '@mui/material';
// import { TablePagination } from '@mui/material';
import Moment from 'moment';

import GenericTable from '../../../generic-table';

function createData(
  ticketNo,
  recruiterType,
  recruiterName,
  connectDate,
  description,
  status,
  from,
  followUpHistory,
  followUp,
  history,
  toId,
  fromId,
  read,
  dataIndex,
  userType,
  withdraw
) {
  return {
    ticketNo,
    recruiterType,
    recruiterName,
    connectDate,
    description,
    status,
    from,
    followUpHistory,
    followUp,
    history,
    toId,
    fromId,
    read,
    dataIndex,
    userType,
    withdraw,
  };
}
function DashboardControlledTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  // const { isLoggedInUserType } = useSelector((state) => state.recruiter);

  const dataHeader = [
    { title: 'Ticket No', name: 'ticketNo', sorting: true, type: 'string' },
    {
      title: 'Professional ID',
      name: 'recruiterType',
      sorting: true,
      type: 'string',
    },
    {
      title: 'Professional Name',

      name: 'recruiterName',
      sorting: true,
      type: 'string',
    },
    { title: 'Last Connect Date', name: 'connectDate', sorting: true, type: 'date' },
    { title: 'Description', name: 'description', sorting: false, type: 'string' },
    { title: 'Status', name: 'status', sorting: false, type: 'string' },
    props?.showTable?.value !== 8 && {
      title: 'Action',
      name: 'followUp',
      sorting: false,
      type: 'string',
    },
    { title: 'History', name: 'history', sorting: false, type: 'string' },
    {
      title: 'Withdraw',
      name: 'withdraw',
      sorting: false,
      type: 'string',
    },
  ];

  const applications = {
    message: [
      {
        id: 55,
        description:
          'Hello, I am looking for job opportunity in Canada. Can we please connect if you have any suitable opportunities.',
        last_message_date: '2022-07-23 14:18:51.0',
        status: 5,
        health_professional_name: 'Chaitali Chandrakant Sakhale',
        health_professional_id: '71-0060-2712-0303',
        read_status: true,
        from_user: '285',
        to_user: '283',
        recruiter_employer_name: 'Global Healthcare career services ',
        type: 'Recruiting Agent',
        recruiter_employer_id: '283',
      },
      {
        id: 138,
        description: 'employment started',
        last_message_date: '2022-07-28 14:33:16.0',
        status: 5,
        health_professional_name: 'Satish Udhavrao Chonde',
        health_professional_id: '71-4075-7823-5179',
        read_status: true,
        from_user: '269',
        to_user: '296',
        recruiter_employer_name: 'Avinash  R  Eklurr',
        type: 'Recruiting Agent',
        recruiter_employer_id: '269',
      },
      {
        id: 648,
        description: 'RA TO HP',
        last_message_date: '2022-10-19 18:19:22.0',
        status: 5,
        health_professional_name: 'Satish Udhavrao Chonde',
        health_professional_id: '71-4875-8731-6251',
        read_status: true,
        from_user: '369',
        to_user: '335',
        recruiter_employer_name: 'Sunlight Recruiters',
        type: 'Recruiting Agent',
        recruiter_employer_id: '369',
      },
      {
        id: 135,
        description: 'hi',
        last_message_date: '2022-07-28 12:29:55.0',
        status: 5,
        health_professional_name: 'Satish Udhavrao Chonde',
        health_professional_id: '71-4075-7823-5179',
        read_status: true,
        from_user: '296',
        to_user: '287',
        recruiter_employer_name: 'Global Employer Services',
        type: 'Foreign Employer',
        recruiter_employer_id: '287',
      },
      {
        id: 627,
        description: 'test',
        last_message_date: '2022-10-18 18:39:02.0',
        status: 5,
        health_professional_name: 'Ashvini Sunil Deshmukh',
        health_professional_id: '37-0512-0077-5138',
        read_status: true,
        from_user: '278',
        to_user: '266',
        recruiter_employer_name: 'Jyoti',
        type: 'Foreign Employer',
        recruiter_employer_id: '278',
      },
    ],
    count: 5,
  };
  // const [selectedRowData, setRowData] = useState({});

  const handleDataRowClick = (dataRow) => {
    // eslint-disable-next-line no-console
    console.log('dataRow', dataRow);
    // setRowData(dataRow);
    // setShowHPProfileDetailsDialog(true);
  };

  const followCallback = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const historyCallback = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const WithdrawnCallback = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy.name === property.name && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const newRowsData = applications.message
    ?.map((application, index) => {
      return createData(
        { type: 'ticketNo', value: application.id },
        {
          type: 'recruiterType',
          value: application?.from_user_id ? application?.to_id : application?.from_id,
        },
        {
          type: 'recruiterName',
          value: application.to ? application.from : application.to,
        },
        {
          type: 'connectDate',
          value: Moment(application?.last_message_date).format('DD-MM-YYYY HH:mm:ss'),
        },
        { type: 'description', value: application.description },
        {
          type: 'status',
          value: application.status,
        },
        { type: 'from', value: application.from },
        { type: 'followUpHistory', value: application.follow_ups },
        { type: 'action', value: 'Follow-up', onClickCallback: followCallback },
        { type: 'action', value: 'History', onClickCallback: historyCallback },
        { type: 'toId', value: application.to_user_id },
        { type: 'fromId', value: application.from_user_id },
        { type: 'read', value: application.read_status },
        { type: 'dataIndex', value: index },
        { type: 'userType', value: application.type },
        {
          type: 'withdraw',
          value: 'Withdraw',
          onClickCallback: WithdrawnCallback,
        }
      );
    })
    .sort((a, b) => {
      const dateB = new Date(
        Moment(b.connectDate.value, 'DD-MM-YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss')
      );
      const dateA = new Date(
        Moment(a.connectDate.value, 'DD-MM-YYYY HH:mm:ss').format('MM/DD/YYYY HH:mm:ss')
      );
      return dateB.getTime() - dateA.getTime();
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid sx={{ m: 2 }}>
      <GenericTable
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        tableHeader={dataHeader}
        data={newRowsData}
        handleRowClick={handleDataRowClick}
        rowsPerPage={rowsPerPage}
        page={page}
      />

      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.showTable?.count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Grid>
  );
}

export default React.memo(DashboardControlledTable);
