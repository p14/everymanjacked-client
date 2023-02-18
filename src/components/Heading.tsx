import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'

const Heading: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', my: 5, textAlign: 'center' }}>
      <Typography component='h1' variant='h1' onClick={() => navigate('/')} sx={{ cursor: 'pointer', fontSize: '32px', fontWeight: 600 }}>
        Workout Generator
      </Typography>
      <Typography>
        by EveryManJacked
      </Typography>
    </Box>
  );
};

export default Heading