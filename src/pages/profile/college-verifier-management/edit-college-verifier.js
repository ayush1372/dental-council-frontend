import { Button, TextField } from '../../../ui/core';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { councilList } from '../../../constants/common-data';
import { useForm } from 'react-hook-form';
import { POST } from '../../../constants/requests';
import { toast } from 'react-toastify';

const EditCollegeVerifierProfile = ({ profile, handleClose, handleGetCollegeVerifierList }) => {
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
            email_id: profile?.email,
            mobile_no: profile?.mobile_number,
            college_id: profile?.college_id,
            college_name: profile?.name,
        },
    });

    const onsubmit = async () => {
        const body_data =
        {
            college_id: getValues()?.college_id,
            name: getValues()?.college_name,
            user_id: getValues()?.user_id,
            email: getValues()?.email_id,
            mobile_no: getValues()?.mobile_no,
        }


        try {
            const resp = await fetch(`${baseUrl}/updateCollegeVerifier`, {
                method: POST,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data),
            });

            if (resp.ok) {
                toast.success('User Updated Successfully!')
                handleGetCollegeVerifierList();
                handleClose();
            } else {
                toast.error('Failed to update User:', resp.statusText)
                console.error('Failed to update user:', resp.statusText);
            }
        } catch (error) {
            toast.error('Failed to update User:', error)
            console.error('Failed to update user:', error);
        } finally {
            // console.log('done')
        }
    }
    return (
        <Box>
            <Grid container item spacing={2} mt={0}>
                <Grid item xs={12} md={3.5}>
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
                <Grid item xs={12} md={2}>
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
                        defaultValue={getValues()?.mobile_number}
                        error={errors.mobile_no?.message}
                        {...register('mobile_no', {
                            required: 'Please enter the mobile number',
                            pattern: {
                                value: /^\d{10}$/i,
                                message: 'Please enter a valid 10 digit mobile number',
                            },
                        })} />
                </Grid>
                <Grid item xs={12} md={6.5}>
                    <Typography variant="body3" color="grey.label">
                        College Name
                    </Typography>
                    <Typography component="span" color="error.main">
                        *
                    </Typography>
                    <TextField
                        fullWidth
                        disabled
                        defaultValue={
                            getValues()?.college_name
                        }
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

export default EditCollegeVerifierProfile