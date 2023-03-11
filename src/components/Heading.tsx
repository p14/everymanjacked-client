import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'

const Heading: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', py: 3, textAlign: 'center', backgroundColor: '#003566' }}>
      <Typography component='h1' variant='h1' color='#EDF2F4' onClick={() => navigate('/')} sx={{ cursor: 'pointer', fontSize: '32px', fontWeight: 600 }}>
        Workout Generator
      </Typography>
      <Typography color='#FFC300'>
        EveryManJacked
      </Typography>
    </Box>
  );
};

export default Heading