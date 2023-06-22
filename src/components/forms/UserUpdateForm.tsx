import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField } from '@mui/material';
import { logout, updateUser } from '../../api/app.api';
import { ArrowBack } from '@mui/icons-material';
import { useSessionContext } from '../../context/session.context';

const UserUpdateForm: React.FC = () => {

    const navigate = useNavigate();
    const { user, refreshSession } = useSessionContext();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = String(data.get('firstName'));
        const lastName = String(data.get('lastName'));

        updateUser({ firstName, lastName })
            .then(() => {
                alert('User updated successfully');
                refreshSession();
            }).catch(() => alert('Failed to update user'));
    };

    return (
        <Box>
            <Container maxWidth='sm'>
                <Box sx={{ alignContent: 'center', display: 'flex', justifyContent: 'space-between', my: 2 }}>
                    <Button onClick={() => navigate('/')} startIcon={<ArrowBack />}>
                        Back
                    </Button>
                    <Button variant='outlined' onClick={logout}>
                        Logout
                    </Button>
                </Box>

                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        defaultValue={user.firstName}
                        margin='dense'
                        id='firstName'
                        label='First Name'
                        name='firstName'
                    />

                    <TextField
                        fullWidth
                        required
                        defaultValue={user.lastName}
                        margin='dense'
                        id='lastName'
                        label='Last Name'
                        name='lastName'
                    />

                    <Button type='submit' fullWidth variant='contained' sx={{ my: 2 }}>
                        Update User
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default UserUpdateForm;
