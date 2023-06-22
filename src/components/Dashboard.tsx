import { Fragment } from 'react'
import { Box, Button, Typography, capitalize } from '@mui/material'
import WorkoutList from './WorkoutList'
import { useNavigate } from 'react-router-dom'
import { useSessionContext } from '../context/session.context';

const Dashboard: React.FC = () => {

    const navigate = useNavigate();
    const { user } = useSessionContext();

    return (
        <Fragment>
            <Typography component='h2' variant='h4'>
                {capitalize(user.firstName)}'s Workouts
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => navigate('/workouts/new')}>
                    Create Workout
                </Button>
            </Box>
            <WorkoutList />
        </Fragment>
    );
};

export default Dashboard;
