import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, MenuItem, TextField, Typography } from '@mui/material';
import { createWorkout, getAllExercises } from '../../api/app.api';
import { UserWorkout, WorkoutCategory, initialUserWorkout } from '../../typings/Workout.typings';
import UserExerciseList from '../UserExerciseList';
import ExerciseModal from '../modals/ExerciseModal';
import { ArrowBack } from '@mui/icons-material';

const WorkoutCreateForm = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [exercises, setExercises] = useState<any[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
    const [userWorkout, setUserWorkout] = useState<UserWorkout>(initialUserWorkout);
    const [openExerciseModal, setOpenExerciseModal] = useState<boolean>(false);

    const fetchExerciseData = async () => {
        const exercises = await getAllExercises();
        if (exercises.data) {
            setExercises(exercises.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchExerciseData();
    }, []);

    useEffect(() => {
        if (userWorkout.category === WorkoutCategory.FULL_BODY) {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(
                exercises.filter((exercise) => (
                    exercise.categories.includes(userWorkout.category)
                ))
            );
        }
    }, [exercises, userWorkout.category]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserWorkout({
            ...userWorkout,
            [name]: value,
        });
      };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const title = String(data.get('title'));
        const category = String(data.get('category'));
        const { exercises } = userWorkout;

        createWorkout({ title, category, exercises })
            .then((response) => {
                alert('Creation was successful');
                navigate(`/workouts/${response.data._id}`);
            }).catch(() => alert('Failed to create'));
    }

    return (
        <Fragment>
            {loading ? 'Loading' :
                <Container maxWidth='sm'>
                    <Box sx={{ display: 'grid', my: 2 }}>
                        <Button onClick={() => navigate('/')} startIcon={<ArrowBack />} sx={{ alignSelf: 'center', justifySelf: 'flex-start', position: 'absolute' }}>
                            Back
                        </Button>
                        <Typography component='h1' variant='h5' sx={{ alignSelf: 'center', justifySelf: 'center' }}>
                            Create Workout
                        </Typography>
                    </Box>

                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            autoFocus
                            fullWidth
                            required
                            value={userWorkout.title}
                            onChange={handleChange}
                            margin='dense'
                            id='title'
                            label='Title'
                            name='title'
                        />

                        <TextField
                            select
                            fullWidth
                            required
                            value={userWorkout.category}
                            onChange={handleChange}
                            margin='dense'
                            id='category'
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

                        <UserExerciseList
                            userExercises={userWorkout.exercises.map((exerciseId) => ({
                                id: exerciseId,
                                title: exercises.find((exercise) => exercise._id === exerciseId).title,
                                categories: exercises.find((exercise) => exercise._id === exerciseId).categories,
                            }))}
                            handleRemoveExercise={(id: string) => setUserWorkout({
                                ...userWorkout,
                                exercises: [...userWorkout.exercises.filter((exercise) => exercise !== id)]
                            })}
                            setOpenExerciseModal={setOpenExerciseModal}
                        />

                        <Button type='submit' fullWidth variant='contained' sx={{ my: 2 }}>
                            Create Workout
                        </Button>
                    </Box>
                </Container>
            }
            {openExerciseModal &&
                <ExerciseModal
                    currentExercises={userWorkout.exercises}
                    exercises={filteredExercises}
                    handleAddExercise={(exerciseId: string) => setUserWorkout({
                        ...userWorkout,
                        exercises: [
                            ...userWorkout.exercises,
                            exerciseId,
                        ]
                    })}
                    handleClose={() => setOpenExerciseModal(false)}
                />
            }
        </Fragment>
    );
};

export default WorkoutCreateForm;
