import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { generateWorkout } from './api/app.api';
import Heading from './components/Heading';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import { Exercise } from './constants/exercise.constants';
import { AppStatus } from './constants/app.constants';
import Footer from './components/Footer';

const App: React.FC = () => {

  const [ appStatus, setAppStatus ] = React.useState<AppStatus>(AppStatus.FORM);
  const [ workout, setWorkout ] = React.useState<Exercise[]>([]);
  const [ category, setCategory ] = React.useState<string>('');

  const handleGenerateWorkout = async ({ category, length }: { category: string, length: number }) => {
    await generateWorkout({ category, length }).then((response) => {
      const { data } = response;
      setWorkout(data);
      setCategory(category);
      setAppStatus(AppStatus.WORKOUT);
    }).catch((error) => console.error(error));
  };

  const handleReset = () => {
    setWorkout([]);
    setCategory('');
    setAppStatus(AppStatus.FORM);
  };

  const renderContent = () => {
    switch(appStatus) {
      case AppStatus.WORKOUT:
        return <WorkoutList workout={workout} backToForm={handleReset} />
      case AppStatus.FORM:
      default:
        return <WorkoutForm generateWorkout={handleGenerateWorkout} />
    }
  };

  return (
      <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Heading />
        <Box sx={{ flexGrow: 1 }}>
          {renderContent()}
        </Box>
        <Footer />
      </Container>
  );
}

export default App;
