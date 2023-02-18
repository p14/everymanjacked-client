import React from 'react';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from './DataTable';
import { useExerciseContext } from '../context/exercise.context';

const ExerciseTable: React.FC = () => {
  const exerciseContext = useExerciseContext();

  const theme = useTheme();
  // const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', minWidth: 200, flex: 1 },
    { field: 'categories', headerName: 'Categories', width: 300, hide: isSmallScreen ? true : false },
  ];

  return (
    <Container maxWidth='md' sx={{ flexGrow: 1 }}>
      <DataTable
        rows={exerciseContext.exercises}
        columns={columns}
      />
    </Container>
  );
};

export default ExerciseTable;
