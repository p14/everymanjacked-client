import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Grid, List, Divider, ListItem, IconButton, ListItemText, Box, TextField } from '@mui/material';
import { BaseExerciseCategory } from '../../typings/Exercise.typings';

interface ExerciseModalProps {
    currentExercises: string[]
    handleAddExercise: (exerciseId: string) => void
    exercises: any[]
    handleClose: () => void
}

const ExerciseModal = ({ currentExercises, handleAddExercise, exercises, handleClose }: ExerciseModalProps) => {

    const [filteredExercises, setFilteredExercises] = useState<any[]>([]);
    const [search, setSearch] = useState<string>('');

    const filterExercises = () => {
        const unselected = exercises.filter((exercise) => {
            return !currentExercises.find((currentExerciseId) => currentExerciseId === exercise._id);
        });

        let filtered = [...unselected];
        if (search) {
            filtered = unselected.filter((exercise) => {
                return exercise.title.toLowerCase().includes(search.toLowerCase());
            });
        }

        setFilteredExercises(filtered);
    };

    const parseExerciseCategories = (data: string[]): string => {
        const parsedCategory = data.find((category) => (
            category in BaseExerciseCategory
        ));

        return parsedCategory ?? '';
    };

    useEffect(() => {
        filterExercises();
    }, [currentExercises, search]);

    return (
        <Dialog open fullWidth maxWidth='sm' onClose={handleClose}>
            <DialogTitle>
                Add Exercises To Workout
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    variant='standard'
                    label='Search'
                    type='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </DialogTitle>
            <DialogContent sx={{ height: '80vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List>
                            {filteredExercises.map((exercise) => (
                                <Box key={exercise._id}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge='end' onClick={() => handleAddExercise(exercise._id)}>
                                                <Add />
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
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExerciseModal;
