import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'lightBlue',
        color: 'navy',
        fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const DeclaredPlaceOfWork = ({ workProfileDetails }) => {
    const { current_work_details } = workProfileDetails || {};
    const rows = current_work_details;
    console.log(current_work_details)
    return (
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Facility ID</StyledTableCell>
                        <StyledTableCell>Facility Status</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>State</StyledTableCell>
                        <StyledTableCell>District</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Department</StyledTableCell>
                        <StyledTableCell>Designation</StyledTableCell>
                        {/* <StyledTableCell>Teleconsultation URL</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <StyledTableRow key={row?.facility_id}>
                            <StyledTableCell component="th" scope="row">
                                {row.facility_id}
                            </StyledTableCell>
                            <StyledTableCell>{'Test'}</StyledTableCell>
                            <StyledTableCell>{row?.work_organization}</StyledTableCell>
                            <StyledTableCell>{row?.address?.address_line1}</StyledTableCell>
                            <StyledTableCell>{row?.address?.state?.name}</StyledTableCell>
                            <StyledTableCell>{row?.address?.district?.name}</StyledTableCell>
                            <StyledTableCell>{row?.organization_type}</StyledTableCell>
                            <StyledTableCell>{row?.department}</StyledTableCell>
                            <StyledTableCell>{row?.designation}</StyledTableCell>
                            {/* <StyledTableCell>{row?.url}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DeclaredPlaceOfWork
