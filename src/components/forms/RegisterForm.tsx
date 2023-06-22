import React from 'react';
import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../Copyright';
import { register } from '../../api/app.api';
import { useSessionContext } from '../../context/session.context';

const RegisterForm: React.FC = () => {

    const { startSession } = useSessionContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = String(data.get('firstName'));
        const lastName = String(data.get('lastName'));
        const username = String(data.get('username'));
        const password = String(data.get('password'));
        const confirmPassword = String(data.get('confirmPassword'));

        if (String(password) !== String(confirmPassword)) {
            alert('Passwords must match');
        } else {
            register({ firstName, lastName, username, password })
                .then((response) => {
                    localStorage.setItem('AccessToken', response.data.AuthenticationResult.AccessToken);
                    localStorage.setItem('RefreshToken', response.data.AuthenticationResult.RefreshToken);
                    startSession();
                }).catch(() => alert('User registration failed'));
        }
    };

    const userFormStyles = {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        my: 8,
        mx: 4,
    };

    return (
        <Box sx={userFormStyles}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography component='h1' variant='h5'>
                REGISTER
            </Typography>

            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                    autoFocus
                    fullWidth
                    required
                    margin='dense'
                    id='firstName'
                    label='First Name'
                    name='firstName'
                />

                <TextField
                    fullWidth
                    required
                    margin='dense'
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                />

                <TextField
                    fullWidth
                    required
                    margin='dense'
                    id='username'
                    label='Username'
                    name='username'
                />

                <TextField
                    fullWidth
                    required
                    margin='dense'
                    id='password'
                    name='password'
                    label='Password'
                    type='password'
                />

                <TextField
                    fullWidth
                    required
                    margin='dense'
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                />

                <Button type='submit' fullWidth variant='contained' sx={{ my: 2 }}>
                    Register
                </Button>

                <Grid container>
                    <Grid item>
                        {"Have an account? "}
                        <Link href='/login'>
                            Log in.
                        </Link>
                    </Grid>
                </Grid>

                <Copyright sx={{ mt: 5 }} />
            </Box>
        </Box>
    );
};

export default RegisterForm;
