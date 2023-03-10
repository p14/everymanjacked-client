import { Box, Button, Card, Container, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { WorkoutCategory, WorkoutData, initialWorkoutData } from '../constants/workout.constants';

interface IWorkoutForm {
  generateWorkout: ({ category, length }: {
    category: string;
    length: number;
  }) => Promise<void>
}

const WorkoutForm = ({ generateWorkout }: IWorkoutForm) => {

  const validationSchema = Yup.object().shape({
    category: Yup.string().oneOf(Object.values(WorkoutCategory)).required(),
    length: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: initialWorkoutData,
    validationSchema,
    onSubmit: (values: WorkoutData) => generateWorkout(values),
  });

  return (
    <Container maxWidth='xs' sx={{ flexGrow: 1 }}>
      <Card sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 8, px: 2, py: 4 }}>
        <Container component='main' maxWidth='sm'>
          <FormControl fullWidth>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  variant='standard'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                  name='category'
                  label='Category'
                >
                  <MenuItem key={WorkoutCategory.CHEST} value={WorkoutCategory.CHEST}>Chest</MenuItem>
                  <MenuItem key={WorkoutCategory.BACK} value={WorkoutCategory.BACK}>Back</MenuItem>
                  <MenuItem key={WorkoutCategory.ARMS} value={WorkoutCategory.ARMS}>Arms</MenuItem>
                  <MenuItem key={WorkoutCategory.SHOULDERS} value={WorkoutCategory.SHOULDERS}>Shoulders</MenuItem>
                  <MenuItem key={WorkoutCategory.LEGS} value={WorkoutCategory.LEGS}>Legs</MenuItem>
                  <MenuItem key={WorkoutCategory.PUSH} value={WorkoutCategory.PUSH}>Push</MenuItem>
                  <MenuItem key={WorkoutCategory.PULL} value={WorkoutCategory.PULL}>Pull</MenuItem>
                  <MenuItem key={WorkoutCategory.UPPER} value={WorkoutCategory.UPPER}>Upper</MenuItem>
                  <MenuItem key={WorkoutCategory.LOWER} value={WorkoutCategory.LOWER}>Lower</MenuItem>
                  <MenuItem key={WorkoutCategory.FULL_BODY} value={WorkoutCategory.FULL_BODY}>Full Body</MenuItem>
                  <MenuItem key={WorkoutCategory.HIIT} value={WorkoutCategory.HIIT}>HIIT</MenuItem>
                </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    variant='standard'
                    value={formik.values.length}
                    onChange={formik.handleChange}
                    error={formik.touched.length && Boolean(formik.errors.length)}
                    helperText={formik.touched.length && formik.errors.length}
                    name='length'
                    label='Length'
                  >
                    <MenuItem key={4} value={4}>Short</MenuItem>
                    <MenuItem key={6} value={6}>Medium</MenuItem>
                    <MenuItem key={8} value={8}>Long</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: 5 , mb: 4 }}>
                Generate
              </Button>
            </Box>
          </FormControl>
        </Container>
      </Card>
    </Container>
  )
}

export default WorkoutForm;