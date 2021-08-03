import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import {DialogTitle, DialogContent, DialogActions} from 'common/ui'
import validate from 'validate.js';

const useStyles = makeStyles((theme) => ({
  entryField: { marginBottom: theme.spacing(4) }
}));


const SharePopUp = ({ open, handleClose, companyName }) => {
  const classes = useStyles()
  const [email, setEmail] = React.useState("");
  const [emailHelper, setEmailHelper] = useState('');
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");


  useEffect(() => { 
    setTitle(`💣 M+A Action Required: Submission From ${companyName}`)
    setMessage(`Hi,\nWe believe that the application from ${companyName} falls within your area of expertise.\nKindly review the application within the next 48 hours.  Endri and I will follow up with the entrepreneur either inviting her/him to a 10 minute call on Thursday at 10:45am or politely passing on the opportunity.  We have committed to circle back to entrepreneurs within 72 hours from their submissions.\nThanks,\nGraciela and Endri`)
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