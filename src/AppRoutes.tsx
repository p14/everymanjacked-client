import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import App from './App';
import ExerciseTable from './components/ExerciseTable';
import FeedbackAlert from './components/FeedbackAlert';
import Footer from './components/Footer';
import Heading from './components/Heading';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { getStatusCheck } from './api/app.api';
import ServerModal from './components/ServerModal';
import { customTheme } from './styles/global.styles';

const AppRoutes: React.FC = () => {

  const [serverCheck, setServerCheck] = React.useState<boolean>(false);
  const [serverRunning, setServerRunning] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      if (!serverCheck) {
        setServerRunning(false);
      }
    }, 1000);

    getStatusCheck().then((response) => {
      console.log('Status Check Message:', response.data);
      setServerCheck(true);
      setServerRunning(true);
    }).catch((error) => {
      console.error(error);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(!serverRunning && !serverCheck) && <ServerModal />}
      <Router>
        <ThemeProvider theme={customTheme}>
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
        </ThemeProvider>
      </Router>
    </>
  );
}

export default AppRoutes;
