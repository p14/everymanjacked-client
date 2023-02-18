import React from 'react';
import { Container } from '@mui/material';
import { generateWorkout } from './api/app.api';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import { Exercise } from './constants/exercise.constants';
import { AppStatus } from './constants/app.constants';

const App: React.FC = () => {

  const [ appStatus, setAppStatus ] = React.useState<AppStatus>(AppStatus.FORM);
  const [ workout, setWorkout ] = React.useState<Exercise[]>([]);

  const handleGenerateWorkout = async (data: { category: string, length: number }) => {
    await generateWorkout(data).then((response) => {
      setWorkout(response.data);
      setAppStatus(AppStatus.WORKOUT);
    }).catch((error) => console.error(error));
  };

  const handleReset = () => {
    setWorkout([]);
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
    <Container maxWidth='sm' sx={{ flexGrow: 1 }}>
      {renderContent()}
    </Container>
  );
}

export default App;
