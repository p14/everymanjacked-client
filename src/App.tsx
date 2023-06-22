import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { getStatusCheck } from './api/app.api';
import ServerModal from './components/ServerModal';
import Hero from './components/Hero';
import Landing from './components/forms/Landing';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import WorkoutUpdateForm from './components/forms/WorkoutUpdateForm';
import Dashboard from './components/Dashboard';
import WorkoutCreateForm from './components/forms/WorkoutCreateForm';
import ExerciseList from './components/ExerciseList';
import Account from './components/Account';
import { SessionProvider } from './context/session.context';
import RequireAuth from './outlets/RequireAuth.outlet';

const App: React.FC = () => {
    const [serverCheck, setServerCheck] = useState<boolean>(false);
    const [serverRunning, setServerRunning] = useState<boolean>(true);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        setTimeout(() => {
            if (!serverCheck) {
                setServerRunning(false);
            }
        }, 1000);

        getStatusCheck().then((response) => {
            console.log('Status Check Message:', response.data);
            setServerCheck(true);
            setServerRunning(true);
        }).catch(console.error);
    }, []);

    return (
        <Box width='100vw'>
            {(!serverRunning && !serverCheck) && <ServerModal />}
            <Router>
                <ThemeProvider theme={darkTheme}>
                    <SessionProvider>
                        {/* <FeedbackProvider> */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            <Routes>
                                {/* Public Routes */}
                                <Route path='/login' element={<Landing component={<LoginForm />} />} />
                                <Route path='/register' element={<Landing component={<RegisterForm />} />} />

                                {/* Private Routes */}
                                <Route element={<RequireAuth />}>
                                    <Route path='/' element={<Hero component={<Dashboard />} />} />
                                    <Route path='/account' element={<Hero component={<Account />} />} />
                                    <Route path='/workouts/new' element={<Hero component={<WorkoutCreateForm />} />} />
                                    <Route path='/workouts/:workoutId' element={<Hero component={<ExerciseList />} />} />
                                    <Route path='/workouts/:workoutId/edit' element={<Hero component={<WorkoutUpdateForm />} />} />
                                </Route>
                            </Routes>
                        </Box>
                        {/* <FeedbackAlert /> */}
                        {/* </FeedbackProvider> */}
                    </SessionProvider>
                </ThemeProvider>
            </Router>
        </Box>
    )
}

export default App;
