import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import { Box, IconButton, Link, Typography, useTheme } from '@mui/material';

import { field_names } from '../../../../constants/common-data';
import GenericTable from '../../../../shared/generic-component/generic-table';

export const AdditionalQualificationTable = ({
  rowData,
  setEditData,
  setFormValues,
  setAttachmentIndex,
  setAttachmentFrame,
}) => {
  const theme = useTheme();
  function createData(
    sr_no,
    requestID,
    degree_name,
    country_name,
    university_name,
    state,
    college_name,
    month_year,
    // broad_specialty,
    // super_specialty,
    attachments,
    // isEditable
    status
  ) {
    return {
      sr_no,
      requestID,
      degree_name,
      country_name,
      university_name,
      state,
      college_name,
      month_year,
      // broad_specialty,
      // super_specialty,
      attachments,
      // isEditable,
      status,
    };
  }

  const dataHeader = [
    { title: 'Sr.no.', name: 'sr_no' },
    { title: 'Request ID', name: 'requestID' },
    { title: 'Degree', name: 'degree_name' },
    { title: 'Country', name: 'country_name' },
    { title: 'University', name: 'university_name' },
    { title: 'State', name: 'state' },
    { title: 'College', name: 'college_name' },
    { title: 'Month & Year', name: 'month_year' },
    // { title: 'Broad Specialty', name: 'broad_specialty' },
    // { title: 'Super Specialty', name: 'super_specialty' },
    { title: 'Attachments', name: 'attachments' },
    { title: 'Status', name: 'status' },
    // { title: 'Action', name: 'isEditable' },
  ];

  const newRowsData = rowData?.slice(1).map((data, index) => {
    return createData(
      {
        type: 'sr_no',
        value: index + 1,
      },
      {
        type: 'requestId',
        value:
          data?.queries?.length > 0 ? (
            <Link
              color={'secondary.main'}
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => {
                setFormValues(data);
                setEditData(data);
              }}
            >
              {data?.request_id}
            </Link>
          ) : (
            data?.request_id
          ),
        tooltipText: data?.request_id,
      },
      {
        type: 'degree_name',
        value:
          data?.queries?.length > 0 ? (
            <Box>
              {data?.course?.course_name}
              {data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.degree && (
                    <Typography>
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ ml: 2, color: theme.palette.secondary.main }}
                      />
                    </Typography>
                    // item?.common_comment
                  )
                );
              })}
            </Box>
          ) : (
            data?.course?.course_name
          ),
        tooltipText: data?.course?.course_name,
      },
      {
        type: 'country_name',
        value:
          data?.queries?.length > 0 ? (
            <Box>
              {data?.country?.name}
              {data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.country && (
                    <Typography>
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ ml: 2, color: theme.palette.secondary.main }}
                      />
                    </Typography>
                    // item?.common_comment
                  )
                );
              })}
            </Box>
          ) : (
            data?.country?.name
          ),
        tooltipText: data?.country?.name,
      },
      {
        type: 'university_name',
        value: (
          <Box>
            <Typography>{data?.university?.name}</Typography>
            {data?.queries?.length > 0 &&
              data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.university && (
                    <Typography>
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ ml: 1, color: theme.palette.secondary.main }}
                      />
                    </Typography>
                  )
                );
              })}
          </Box>
        ),
      },
      {
        type: 'state',
        value: (
          <Box>
            <Typography mr={1}>{data?.state?.name}</Typography>
            {data?.queries?.length > 0 &&
              data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.state && (
                    <Typography component={'span'}>
                      {' '}
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    </Typography>
                    // item?.common_comment
                  )
                );
              })}
          </Box>
        ),
      },

      {
        type: 'college_name',
        value: (
          <Box>
            <Typography mr={1}>{data?.college?.name}</Typography>
            {data?.queries?.length > 0 &&
              data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.college && (
                    <Typography component={'span'}>
                      {' '}
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    </Typography>
                    // item?.common_comment
                  )
                );
              })}
          </Box>
        ),
      },
      {
        type: 'month_year',
        value:
          data?.queries?.length > 0 ? (
            <Box>
              {`${data?.qualification_month} ${data?.qualification_year} `}
              {data?.queries?.map((item) => {
                return (
                  item?.field_name?.toUpperCase().toString() === field_names.monthAwarded && (
                    <Typography>
                      <ReportOutlinedIcon
                        fontSize="inherit"
                        sx={{ ml: 2, color: theme.palette.secondary.main }}
                      />
                    </Typography>
                    // item?.common_comment
                  )
                );
              })}
            </Box>
          ) : (
            `${data?.qualification_month} ${data?.qualification_year} `
          ),
        tooltipText: `${data?.qualification_month} ${data?.qualification_year} `,
      },
      // {
      //   type: 'broad_specialty',
      //   value: '-',
      // },
      // {
      //   type: 'super_specialty',
      //   value: '-',
      // },
      {
        type: 'attachments',
        isIcon: true,
        iconToolTip: 'View Attachment',
        value: (
          <IconButton>
            <AttachFileIcon
              fontSize="10px"
              onClick={(e) => {
                e.preventDefault();
                setAttachmentIndex(index + 1);
                setAttachmentFrame(true);
              }}
            />
          </IconButton>
        ),
      },
      {
        type: 'status',

        value:
          data?.queries?.length <= 0 && data?.is_verified === 1 ? (
            <Typography varaint={'body1'} color={'success.main'}>
              {'Approved'}
            </Typography>
          ) : data?.queries?.length > 0 && data?.is_verified === 0 ? (
            <Typography varaint={'body1'} color={'secondary.main'}>
              {'Query Raised'}
            </Typography>
          ) : (
            <Typography varaint={'body1'} color={'primary.main'}>
              {'Pending'}
            </Typography>
          ),
      }
    );
  });

  return (
    <Box mt={1}>
      <GenericTable tableHeader={dataHeader} data={newRowsData} />
    </Box>
  );
};
