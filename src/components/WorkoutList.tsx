import { Box, Button, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Exercise } from '../constants/exercise.constants';

interface IWorkoutList {
  workout: Exercise[]
  backToForm: () => void
}

const WorkoutList = ({ workout, backToForm }: IWorkoutList) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            {workout.map((exercise) => (
              <Box key={exercise._id}>
                <ListItem>
                  <ListItemText
                    primary={exercise.title}
                    secondary={exercise.categories}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Grid>
      </Grid>

      <Button variant='contained' sx={{ mb: 5, mt: 2 }} onClick={() => backToForm()}>
        Back to Form
      </Button>
    </Box>
  );
};

export default WorkoutList;