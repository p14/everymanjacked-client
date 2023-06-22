import React from 'react';
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { deleteWorkout, getUserWorkouts } from '../api/app.api';
import { menuProps, workoutContainerStyles } from '../styles/WorkoutList.styles';
import { useNavigate } from 'react-router-dom';

const WorkoutList: React.FC = () => {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = React.useState<{ _id: string, title: string, category: string }[]>([]);
    const [selectedWorkout, setSelectedWorkout] = React.useState<string | null>(null);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>, workoutId: string) => {
        setSelectedWorkout(workoutId);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setSelectedWorkout(null);
        setAnchorEl(null);
    };

    const getWorkouts = async () => {
        const { data } = await getUserWorkouts();
        const userWorkouts = data ?? [];
        setWorkouts(userWorkouts);
    };

    const handleDeleteWorkout = async () => {
        deleteWorkout(String(selectedWorkout))
            .then(() => {
                const updatedWorkouts = workouts.filter((workout) => (
                    String(workout._id) !== String(selectedWorkout)
                ));
                setWorkouts(updatedWorkouts);
                handleClose();
                alert('Workout delete successful');
            })
            .catch(console.error);
    };

    const handleStartWorkout = (workoutId: string | null = null) => {
        handleClose();
        if (!workoutId) {
            navigate(`/workouts/${selectedWorkout}`);
        } else {
            navigate(`/workouts/${workoutId}`)
        }
    };

    const handleEditWorkout = () => {
        handleClose();
        navigate(`/workouts/${selectedWorkout}/edit`);
    };

    React.useEffect(() => {
        let mounted = true;
        if (mounted) {
            getWorkouts();
        }
        return () => {
            mounted = false;
        }
    }, []);

    const workoutOptions = (workoutId: string) => (
        <IconButton edge='end' aria-label='options' onClick={(e) => handleClick(e, workoutId)}>
            <MoreVert />
        </IconButton>
    );

    return (
        <Box sx={workoutContainerStyles}>
            <List>
                {workouts.map((workout: { _id: string, title: string, category: string }) => (
                    <ListItem key={workout._id} secondaryAction={workoutOptions(workout._id)}>
                        <ListItemText
                            primary={workout.title}
                            secondary={workout.category.replace('_', ' ')}
                            onClick={() => handleStartWorkout(workout._id)}
                        />
                    </ListItem>
                ))}
            </List>

            <Menu {...menuProps({ anchorEl, open, onClose: handleClose })}>
                <MenuItem onClick={() => handleStartWorkout()}>
                    View
                </MenuItem>
                <MenuItem onClick={handleEditWorkout}>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteWorkout}>
                    Delete
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default WorkoutList;
