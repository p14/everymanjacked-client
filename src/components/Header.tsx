import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const Header: React.FC = () => {

    const navigate = useNavigate();

    return (
        <Container maxWidth='lg'>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', height: '80px' }}>
                <Typography component='h1' variant='h4' onClick={() => navigate('/')} sx={{ cursor: 'pointer', fontWeight: 600 }}>
                    EveryManJacked
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant='text' onClick={() => navigate('/')} sx={{ mx: 0.5 }}>
                        Dashboard
                    </Button>
                    <Button variant='text' onClick={() => navigate('/account')} sx={{ mx: 0.5 }}>
                        Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Header;
