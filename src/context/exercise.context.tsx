import { createContext, useContext, useEffect, useState } from 'react';
import { getAllExercises } from '../api/app.api';
import { Exercise } from '../constants/exercise.constants';
import { useLocation } from 'react-router-dom';

export const ExerciseContext = createContext({ } as { exercises: Exercise[], setExercises: (exercises: Exercise[]) => void });

export const useExerciseContext = () => useContext(ExerciseContext);

export function ExerciseProvider({ children }: { children: any }) {

  /**
   * Background color logic should not live here
   * useLocation must live inside Router
   */
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('exercises')) {
      document.body.style.backgroundColor = '#fff';
    } else {
      document.body.style.backgroundColor = '#EDF2F4';
    }
  }, [location]);

  const [exerciseState, setExerciseState] = useState<Exercise[]>([]);

  const setExercises = (exercises: Exercise[]): void => {
    setExerciseState(exercises);
  };

  useEffect(() => {
    getAllExercises().then((response) => {
      setExercises(response.data);
    }).catch((error) => {
      console.error(error.response.data);
    });
  }, []);

  return (
    <ExerciseContext.Provider value={{ exercises: exerciseState, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};
