import { Alert, Snackbar } from '@mui/material';
import { useFeedbackContext } from '../context/feedback.context';

const FeedbackAlert = () => {

  const feedbackContext = useFeedbackContext();

  return (
    <Snackbar 
      open={feedbackContext.feedback.open} 
      autoHideDuration={6000} 
      onClose={() => feedbackContext.setFeedback({ ...feedbackContext.feedback, open: false })}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
     }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Alert
        onClose={() => feedbackContext.setFeedback({ ...feedbackContext.feedback, open: false })}
        severity={feedbackContext.feedback.type}
      >
        {feedbackContext.feedback.message}
      </Alert>
    </Snackbar>
  );
};

export default FeedbackAlert;
