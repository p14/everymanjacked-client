import React from 'react'
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ my: 2.5, textAlign: 'center' }}>
      <Typography variant='caption'>
        Created by Joseph Perez - All Exercises
      </Typography>
    </Box>
  );
};

export default Footer;
