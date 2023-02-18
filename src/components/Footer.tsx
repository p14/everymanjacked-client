import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {

  const location = useLocation();
  const renderLink = () => {
    if (location.pathname.includes('exercises')) {
      return (
        <Link to='/'>Home</Link>
      );
    }
    return (
      <Link to='/exercises'>All Exercises</Link>
    );
  };

  return (
    <Box sx={{ my: 2.5, textAlign: 'center' }}>
      <Typography variant='caption'>
        Created by Joseph Perez - {renderLink()}
      </Typography>
    </Box>
  );
};

export default Footer;
