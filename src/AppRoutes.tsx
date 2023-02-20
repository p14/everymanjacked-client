import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import App from './App';
import ExerciseTable from './components/ExerciseTable';
import FeedbackAlert from './components/FeedbackAlert';
import Footer from './components/Footer';
import Heading from './components/Heading';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { getStatusCheck } from './api/app.api';
import ServerModal from './components/ServerModal';

const AppRoutes: React.FC = () => {

  const [serverRunning, setServerRunning] = React.useState<boolean>(false);

  React.useEffect(() => {
    getStatusCheck().then((response) => {
      console.log('Status Check Message:', response);
      setServerRunning(true);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      {!serverRunning && <ServerModal />}
      <Router>
        <ExerciseProvider>
          <FeedbackProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Heading />
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='/exercises' element={<ExerciseTable />} />
              </Routes>
              <Footer />
            </Box>
            <FeedbackAlert />
          </FeedbackProvider>
        </ExerciseProvider>
      </Router>
    </>
  );
}

export default AppRoutes;
