import { Box, Button, Card, Container, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Exercise } from '../constants/exercise.constants';

interface IWorkoutList {
  workout: Exercise[]
  backToForm: () => void
}

const WorkoutList = ({ workout, backToForm }: IWorkoutList) => {
  return (
    <Card sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 8, px: 2, py: 4 }}>
      <Container component='main' maxWidth='sm'>
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

        <Button fullWidth variant='contained' sx={{ mb: 5, mt: 2 }} onClick={() => backToForm()}>
          Back to Home
        </Button>
      </Container>
    </Card>
  );
};

export default WorkoutList;