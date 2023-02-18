import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { ExerciseProvider } from './context/exercise.context';
import App from './App';
import ExerciseTable from './components/ExerciseTable';
import Heading from './components/Heading';
import Footer from './components/Footer';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ExerciseProvider>
        {/* <FeedbackProvider> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Heading />
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/exercises' element={<ExerciseTable />} />
            </Routes>
            <Footer />
          </Box>
          {/* <FeedbackAlert /> */}
        {/* </FeedbackProvider> */}
      </ExerciseProvider>
    </Router>
  );
}

export default AppRoutes;
