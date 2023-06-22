import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../../context/session.context';

interface LandingProps {
    component: React.ReactElement;
}

const Landing = ({ component }: LandingProps) => {

    const { isLoggedIn } = useSessionContext();
    const navigate = useNavigate();  

    const backgroundImageProps = {
        width: {
            xs: '50%',
            sm: '65%',
            md: '50%',
        },
        sx: {
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
    };

    const formProps = {
        width: {
            xs: '0%',
            sm: '35%',
            md: '50%',
        },
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        };
    }, []);

    return (
        <Box component='main' sx={{ display: 'flex', height: '100vh' }}>
            <Box {...backgroundImageProps} />
            <Box {...formProps}>
                {component}
            </Box>
        </Box>
    );
}

export default Landing;
