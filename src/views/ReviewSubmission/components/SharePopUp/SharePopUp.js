import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import validate from 'validate.js';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles((theme) => ({
  entryField: { marginBottom: theme.spacing(4) }
}));


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => onClose()}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const SharePopUp = ({ open, handleClose, companyName }) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState("");
  const [emailHelper, setEmailHelper] = useState('');
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");


  useEffect(() => { 
    setTitle(`💣 M+A Action Required: Submission From ${companyName}`)
    setMessage(`Hi,\nKindly review the application within the next 48 hours.  We will follow up with the entrepreneur either inviting her/him to a 10 minute call on Thursday at 10:45am or politely passing on the opportunity. \nThanks,\nThe M&A Team`)
  }, [companyName] )

  const emailChangeHandler = (emailText) => {
    console.log(emailText)
    const emailCheck = validate.single(emailText, {presence: true, email: true})
    console.log(emailCheck)
    if (emailCheck) {
        setEmailHelper(emailCheck[0])
    } else {
        setEmailHelper("")
    }
    setEmail(emailText)
  }

  const shareClicked = () => {
    console.log("Clicked!!!")
    handleClose({ email, title, message })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="share submission pop-up" onClose={handleClose}>
          Share Submission from: {companyName}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Send an email to another M+A member to review this company. You can modify the message below:
          </DialogContentText>
          <TextField
            autoFocus
            required
            error={!!emailHelper}
            helperText={emailHelper}
            value={email}
            onChange={(e) => emailChangeHandler(e.target.value)}
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            className={classes.entryField}
          />
          <TextField
            value={title}
            id="title"
            name="title"
            label="Message Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            className={classes.entryField}
          />
          <TextField
            value={message}
            id="message"
            name="message"
            label="Message"
            type="text"
            multiline
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            className={classes.entryField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose()}>
            Cancel
          </Button>
          <Button onClick={shareClicked} 
                  color="primary" disabled={emailHelper.length > 0 || email.length === 0} >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SharePopUp