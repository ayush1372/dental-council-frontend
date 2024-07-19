import React, { useEffect, useState } from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Grid,
    styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#224468',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const AdminUserManagement = () => {
    const [loading, setLoading] = useState(false);
    const [sdcProfileList, setSdcProfileList] = useState([]);
    const baseUrl = process.env.REACT_APP_V1_API_URL;

    const getSdcProfileList = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${baseUrl}/sdc-list`);
            if (resp.ok) {
                const data = await resp.json();
                setSdcProfileList(data);
            } else {
                console.error('Failed to fetch the list:', resp.statusText);
            }
        } catch (error) {
            console.error('Error fetching the list:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSdcProfileList();
    }, []);

    return (
        <Box sx={{ padding: "1em" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm="auto"
                    sx={{
                        mr: { xs: 0, sm: 'auto' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <h1 style={{
                        fontSize: '2em',
                        marginTop: 0,
                        marginBottom: 0
                    }}>
                        Admin User Management
                    </h1>
                </Grid>

                <Grid item xs={12} sm="auto">
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="secondary"
                    >
                        Add New User
                    </Button>
                </Grid>
            </Grid>
            {loading ? (
                <Typography variant="h6" color="textSecondary">
                    Loading...
                </Typography>
            ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
                    <TableContainer sx={{ maxHeight: 520 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ minWidth: '50px' }} align='center'>ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '100px' }} align='center'>SMC ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Name</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Display Name</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '200px' }} align='center'>Email ID</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '150px' }} align='center'>Mobile No</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '100px' }} align='center'>Status</StyledTableCell>
                                    <StyledTableCell sx={{ minWidth: '300px' }} align='center'>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sdcProfileList.map((profile) => (
                                    <TableRow key={profile.id}>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.state_medical_council_id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.first_name} {profile.last_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.display_name}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.email_id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.mobile_no}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{profile.state_medical_council_id > 5 ? "Active" : "Inactive"}</TableCell>
                                        <TableCell sx={{
                                            textAlign: 'center',
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            padding: '1.5em 0',
                                            gap: '8px'
                                        }}>
                                            <Button
                                                variant="contained"
                                                size='small'
                                                color="secondary"
                                                startIcon={<EditIcon sx={{ mr: 1 }} />}>
                                                Edit
                                            </Button>
                                            {profile.state_medical_council_id > 5 ?
                                                <Button variant="outlined"
                                                    size='small'
                                                    color="error">
                                                    Deactivate
                                                </Button> :
                                                <Button
                                                    variant="outlined"
                                                    size='small'
                                                    color="success">
                                                    Activate
                                                </Button>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </Box>
    );
}

export default AdminUserManagement;
