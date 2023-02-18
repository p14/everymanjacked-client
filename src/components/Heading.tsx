import React from 'react'
import { Box, Typography } from '@mui/material'

const Heading: React.FC = () => {
  return (
    <Box sx={{ my: 5, textAlign: 'center' }}>
      <Typography component='h1' variant='h1' sx={{ fontSize: '32px', fontWeight: 600 }}>
        Workout Generator
      </Typography>
      <Typography>
        by EveryManJacked
      </Typography>
    </Box>
  );
};

export default Heading