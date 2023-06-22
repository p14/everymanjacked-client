import { Fragment, ReactElement } from 'react';
import { Box } from '@mui/material';
import Header from './Header';

interface HeroProps {
    component: ReactElement;
}

const Hero = ({ component }: HeroProps) => {
    return (
        <Fragment>
            <Header />
            <Box sx={{ backgroundColor: '#003566', minHeight: 'calc(100vh - 80px)' }}>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', m: 4 }}>
                    {component}
                </Box>
            </Box>
        </Fragment>
    );
};

export default Hero;
