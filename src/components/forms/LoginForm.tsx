import React from 'react';
import { Avatar, Box, Button, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../Copyright';
import { login } from '../../api/app.api';
import { useSessionContext } from '../../context/session.context';

const LoginForm: React.FC = () => {

    const { startSession } = useSessionContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = String(data.get('username'));
        const password = String(data.get('password'));
        login({ username, password })
            .then((response) => {
                localStorage.setItem('AccessToken', response.data.AuthenticationResult.AccessToken);
                localStorage.setItem('RefreshToken', response.data.AuthenticationResult.RefreshToken);
                startSession();
            }).catch(() => alert('Username or password was incorrect'));
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
                LOGIN
            </Typography>

            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    autoFocus
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

                <Button type='submit' fullWidth variant='contained' sx={{ my: 2 }}>
                    Log In
                </Button>

                <Typography>
                    {"Don't have an account? "}
                    <Link href='/register'>
                        Register.
                    </Link>
                </Typography>

                <Copyright sx={{ mt: 5 }} />
            </Box>
        </Box>
    );
};

export default LoginForm;
