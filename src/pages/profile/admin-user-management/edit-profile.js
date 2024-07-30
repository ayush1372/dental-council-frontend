import { Button, TextField } from '../../../ui/core';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { councilList } from '../../../constants/common-data';
import { useForm } from 'react-hook-form';
import { POST } from '../../../constants/requests';
import { toast } from 'react-toastify';

const EditProfile = ({ profile, handleClose, handlegetSdcProfileList }) => {
    const baseUrl = process.env.REACT_APP_V1_API_URL;
    const {
        register,
        handleSubmit,
        clearErrors,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            user_id: profile?.user_id,
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            display_name: profile?.display_name,
            state_medical_council_id: profile?.state_medical_council_id,
            email_id: profile?.email_id,
            mobile_no: profile?.mobile_no,
        },
    });

    const onsubmit = async () => {
        const body_data =
        {
            state_medical_council_id: getValues()?.state_medical_council_id,
            first_name: getValues()?.first_name,
            last_name: getValues()?.last_name,
            user_id: getValues()?.user_id,
            middle_name: "",
            display_name: getValues()?.display_name,
            email_id: getValues()?.email_id,
            mobile_no: getValues()?.mobile_no,
        }
        
        try {
            const resp = await fetch(`${baseUrl}/updateSdcVerifier`, {
                method: POST,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data),
            });

            if (resp.ok) {
                toast.success('User Updated Successfully!')
                handlegetSdcProfileList();
                handleClose();
            } else {
                toast.error('Failed to update User:', resp.statusText)
                console.error('Failed to update user:', resp.statusText);
            }
        } catch (error) {
            toast.error('Failed to update User:', error)
            console.error('Failed to update user:', error);
        } finally {
            console.log('done')
        }


        // handleClose();
    }
    return (
        <Box>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        First Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'first_name'}
                        defaultValue={getValues()?.first_name}
                        error={errors.first_name?.message}
                        {...register('first_name', {
                            required: 'Please enter first name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid first name',
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Last Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'last_name'}
                        defaultValue={getValues()?.last_name}
                        error={errors.last_name?.message}
                        {...register('last_name', {
                            required: 'Please enter last name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid last name',
                            },
                        })}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        State Medical Council
                    </Typography>
                    <TextField
                        fullWidth
                        disabled
                        defaultValue={
                            councilList.find((item) =>
                                item.id === getValues().state_medical_council_id)?.name
                        }
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Display Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'display_name'}
                        defaultValue={getValues()?.display_name}
                        error={errors.display_name?.message}
                        {...register('display_name', {
                            required: 'Please enter display name',
                            pattern: {
                                value: /^[A-Za-z0-9()-,.' ]*$/,
                                message: 'Please enter a valid display name',
                            },
                        })}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Mobile Number
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        name={'mobile_no'}
                        defaultValue={getValues()?.mobile_no}
                        error={errors.mobile_no?.message}
                        {...register('mobile_no', {
                            required: 'Please enter the mobile number',
                            pattern: {
                                value: /^\d{10}$/i,
                                message: 'Please enter a valid 10 digit mobile number',
                            },
                        })} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body3" color="grey.label">
                        Email
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        required
                        name={'email_id'}
                        defaultValue={getValues().email_id}
                        error={errors.email_id?.message}
                        {...register('email_id', {
                            required: 'Please enter an email',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                                message: 'Please enter a valid email',
                            },
                        })}
                    />
                </Grid>


            </Grid>


            <Box display="flex" mt={3} md="auto" justifyContent={'flex-end'}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        mr: 2,
                        width: {
                            xs: '100%',
                            md: 'fit-content',
                        },
                    }}
                    onClick={handleSubmit(onsubmit)}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="grey"
                    sx={{
                        width: {
                            xs: '100%',
                            md: 'fit-content',
                        },
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default EditProfile