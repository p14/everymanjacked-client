import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, LinearProgress } from '@mui/material';

const ServerModal: React.FC = () => {
    return (
        <Dialog open={true}>
            <DialogTitle>
                Starting the server
            </DialogTitle>
            <DialogContent>
                This app is currently hosted on a free server, thank you for your patience!
                <Box sx={{ mt: 1 }}>
                    <LinearProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ServerModal;
