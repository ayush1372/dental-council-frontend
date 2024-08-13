import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import tableCellClasses from '@mui/material/TableCell/tableCellClasses';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#224468',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const baseUrl = process.env.REACT_APP_V1_API_URL;

const StateWiseReport = () => {
    const [loading, setLoading] = useState(false);
    const [stateWiseData, setStateWiseData] = useState([])

    const handleGetStateWiseReport = async () => {
        setLoading(true)
        try {
            const resp = await fetch(`${baseUrl}/dashboards/statusWiseReport`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }
            const data = await resp.json();
            setStateWiseData(data);

        } catch (error) {
            console.error('Failed to change user user status:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCsvDownload = async () => {
        try {
            const resp = await fetch(`${baseUrl}/dashboards/statusWiseReport?excel=true`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }

            const textData = await resp.text();

            const lines = textData.split('\n');
            const originalHeaders = lines[0];
            const dataRows = lines.slice(1);
            const newHeaders = 'State Dental Council,Draft,Pending,Approved,Query Raised,Rejected';

            const modifiedCsvContent = [newHeaders, ...dataRows].join('\n');

            const blob = new Blob([modifiedCsvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'StateWiseReport.csv');
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("File downloaded successfully");
        } catch (error) {
            console.error('Failed to download CSV:', error);
            toast.error("Failed to download CSV");
        }
    };


    useEffect(() => {
        handleGetStateWiseReport();
    }, [])


    return (
        <Paper sx={{ padding: '1rem 1rem 0' }}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm="auto"
                    sx={{
                        mr: { xs: 0, sm: 'auto' },
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <h1 style={{
                        fontSize: '1.8em',
                        marginTop: 0,
                        marginBottom: 0
                    }}>
                        State Wise Report
                    </h1>
                </Grid>

                <Grid item xs={12} sm="auto">
                    <Button
                        fullWidth
                        size='small'
                        variant="contained"
                        color="secondary"
                        justifyContent="center"
                        onClick={handleCsvDownload}
                    >
                        <FileDownloadIcon sx={{ mr: '5px' }} />
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>S. No.</StyledTableCell>
                            <StyledTableCell>State Dental Council</StyledTableCell>
                            <StyledTableCell width="100px">Draft</StyledTableCell>
                            <StyledTableCell>Pending</StyledTableCell>
                            <StyledTableCell>Approved</StyledTableCell>
                            <StyledTableCell>Query Raised</StyledTableCell>
                            <StyledTableCell>Rejected</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ?
                            (
                                <StyledTableCell colSpan={6} align='center'
                                >Loading...</StyledTableCell>
                            ) :
                            stateWiseData?.map((row, index) => (
                                <TableRow key={index}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{row[0]}</StyledTableCell>
                                    <StyledTableCell>{row[1]}</StyledTableCell>
                                    <StyledTableCell>{row[2]}</StyledTableCell>
                                    <StyledTableCell>{row[3]}</StyledTableCell>
                                    <StyledTableCell>{row[4]}</StyledTableCell>
                                    <StyledTableCell>{row[5]}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StateWiseReport;
