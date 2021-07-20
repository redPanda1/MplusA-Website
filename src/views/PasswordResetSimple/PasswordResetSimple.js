import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from './components';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import PasswordPopUp from './components/PasswordPopUp';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



const useStyles = makeStyles(theme => ({
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    maxWidth: 500,
    margin: `0 auto`,
  },
  section: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PasswordResetSimple = () => {
  const classes = useStyles();
  const [showPasswordPopUp, setShowPasswordPopUp] = useState(false)
  const [userMessage, setUserMessage] = useState()

  const handleSubmit = () => {
    setShowPasswordPopUp(true)
  }

  const closePasswordPopUp = () => {
    setShowPasswordPopUp(false)
  }
  const handleUserMessgaeClose = (event, reason) => {
    if (reason === 'clickaway') return
    setUserMessage();
  }


  return (
    <div>
      <Section className={classes.section}>
        <div className={classes.formContainer}>
          <SectionHeader
            title="Password reset"
            subtitle="Enter your email to reset your password."
            titleProps={{
              variant: 'h3',
            }}
          />
          <Form submit={handleSubmit}/>
        </div>
      </Section>
      <PasswordPopUp open={showPasswordPopUp} handleClose={closePasswordPopUp} />
      {!!userMessage && (
        <Snackbar open={!!userMessage} autoHideDuration={6000} onClose={handleUserMessgaeClose}>
          <Alert onClose={handleUserMessgaeClose} severity={userMessage ? userMessage.type : "success"}>
            {userMessage && userMessage.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default PasswordResetSimple;
