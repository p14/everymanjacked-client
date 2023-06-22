import { Fragment } from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { BaseExerciseCategory } from '../typings/Exercise.typings';

interface UserExerciseListProps {
    userExercises: { id: string, title: string, categories: string[] }[]
    handleRemoveExercise: (id: string) => void
    setOpenExerciseModal: (open: boolean) => void
}

const UserExerciseList = ({ userExercises, handleRemoveExercise, setOpenExerciseModal }: UserExerciseListProps) => {
    const parseExerciseCategories = (data: string[]): string => {
        const parsedCategory = data.find((category) => (
            category in BaseExerciseCategory
        ));

        return parsedCategory ?? '';
    };

    return (
        <Fragment>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Typography variant='h6'>
                    Exercises:
                </Typography>
                <Button onClick={() => setOpenExerciseModal(true)}>
                    Add Exercises
                </Button>
            </Box>
            <List>
                {userExercises.map((exercise) => (
                    <Box key={exercise.id}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge='end' onClick={() => handleRemoveExercise(exercise.id)}>
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={exercise.title}
                                secondary={parseExerciseCategories(exercise.categories)}
                            />
                        </ListItem>
                        <Divider />
                    </Box>
                ))}
            </List>

        </Fragment>
    );
};

export default UserExerciseList;
