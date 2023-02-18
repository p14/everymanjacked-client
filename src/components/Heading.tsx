import React from 'react'
import { Box, Typography } from '@mui/material'

const Heading: React.FC = () => {
  return (
    <Box sx={{ my: 5, textAlign: 'center' }}>
      <Typography component='h2' variant='h2'>
        Workout Generator
      </Typography>
      <Typography component='h6' variant='h6'>
        by EveryManJacked
      </Typography>
    </Box>
  );
};

export default Heading