import { Fragment, useEffect, useState } from 'react';
import { Box, Button, Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { getWorkoutWithExercises } from '../api/app.api';
import { workoutContainerStyles } from '../styles/WorkoutList.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { BaseExerciseCategory } from '../typings/Exercise.typings';

const ExerciseList: React.FC = () => {
    const navigate = useNavigate();
    const { workoutId } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [workoutData, setWorkoutData] = useState<any>({ exercises: [] });

    const getWorkouts = async () => {
        const { data } = await getWorkoutWithExercises(String(workoutId));
        setWorkoutData(data);
        setLoading(false);
    };

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getWorkouts();
        }
        return () => {
            mounted = false;
        }
    }, []);

    const parseExerciseCategories = (data: string[]): string => {
        const parsedCategory = data.find((category) => (
            category in BaseExerciseCategory
        ));

        return parsedCategory ?? '';
    };

    return (
        <Fragment>
            {!loading &&
                <Container maxWidth='sm'>
                    <Box sx={{ display: 'grid', my: 2 }}>
                        <Button onClick={() => navigate('/')} startIcon={<ArrowBack />} sx={{ alignSelf: 'center', justifySelf: 'flex-start', position: 'absolute' }}>
                            Back
                        </Button>
                        <Typography component='h1' variant='h5' sx={{ alignSelf: 'center', justifySelf: 'center' }}>
                            {workoutData.title}
                        </Typography>
                    </Box>

                    <Box sx={workoutContainerStyles}>
                        <List>
                            {workoutData.exercises.map((exercise: {
                                categories: string[]
                                title: string
                                _id: string
                            }) => (
                                <Box key={exercise._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={exercise.title}
                                            secondary={parseExerciseCategories(exercise.categories)}
                                        />
                                    </ListItem>
                                    <Divider />
                                </Box>
                            ))}
                        </List>
                    </Box>
                </Container>
            }
        </Fragment>
    );
};

export default ExerciseList;
