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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import DialogContentText from '@mui/material/DialogContentText';

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

// Reject reasons
const rejectReasons = [{ id: 1, name: "focus", text: "the current focus of our group’s investments are not aligned with that of your company" },
{ id: 2, name: "stage", text: "the stage of your company does not meet the maturity for an investment form M+A " },
{ id: 3, name: "market", text: "we have concerns about the market segment you are serving" },
{ id: 4, name: "competition", text: "we are worried about the competitive landscape that you are facing" },
{ id: 5, name: "exit", text: "the exit opportunities for your company are not clear" },
{ id: 6, name: "scalability", text: "we are concerned about the scalability of your business" },
{ id: 7, name: "market size", text: "we do not believe that the total addressable market is sufficent" },
{ id: 8, name: "conflict", text: "unfortunately your business conflicts with other entities we have funded" },
{ id: 9, name: "technology", text: "we have concerns about the maturity of your technology platform" },
{ id: 10, name: "traction", text: "you have not demonstrated sufficient customer traction" }
]

const messageTitleText = "Your Application To M+A"
const messageStartText = "Thank you for submitting your information to M+A.  Our team has reviewed your materials and compared it to the criteria we have for engaging with entrepreneurs. As you may be aware, M+A is keenly focused on working with underrepresented and overlooked entrepreneurs and we certainly took that into account in your situation. Our group is committed to fostering entrepreneur’s activities and we want to make efficient use of your time. We do not feel that it would be worth your time to pursue further investment or mentoring from our group at this time. This is primarily due to our following concerns:"
const messageEndText = "We certainly would be happy to revisit our decision if over the next 3-6 months you believe that you have achieved key milestones or gained significant traction with your venture."
const messageSignatureText = "Yours sincerely,\nThe M+A Team"

const SharePopUp = ({ open, handleClose, submissionData }) => {
  const classes = useStyles()
  const { company } = submissionData
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageIntro, setMessageIntro] = useState("");
  const [messageStart, setMessageStart] = useState("");
  const [messageEnd, setMessageEnd] = useState("");
  const [messageSignature, setMessageSignature] = useState("");

  useEffect(() => {
    setMessageTitle(messageTitleText)
    setMessageIntro(`Dear ${submissionData.givenName},`)
    setMessageStart(messageStartText)
    setMessageEnd(messageEndText)
    setMessageSignature(messageSignatureText)
  }, [submissionData])

  const sendClicked = () => {
    console.log("Clicked!!!")
    handleClose({messageTitle, messageIntro, messageStart, messageEnd, messageSignature, rejectionReasons})
  }
  const handleChange = (event) => {
    console.log("Handle Change")
    setRejectionReasons(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="share submission pop-up" onClose={handleClose}>
          Reject Company: {company}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Send an email to the founder explaining why M+A is declining to move forward with this company:
          </DialogContentText>

          <TextField
            value={messageTitle}
            name="title"
            label="Message Title"
            type="text"
            onChange={(e) => setMessageTitle(e.target.value)}
            fullWidth
            className={classes.entryField}
          />

          <TextField
            value={messageIntro}
            name="intro"
            label="Salutation"
            type="text"
            onChange={(e) => setMessageIntro(e.target.value)}
            fullWidth
            className={classes.entryField}
          />

          <TextField
            value={messageStart}
            name="messageStart"
            label="Message Start"
            type="text"
            onChange={(e) => setMessageStart(e.target.value)}
            fullWidth
            className={classes.entryField}
            multiline
          />

          <FormControl className={classes.entryField} fullWidth >
            <InputLabel>Reason(s) for Rejection</InputLabel>
            <Select
              multiple
              value={rejectionReasons}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.map(e => e.name).join(", ")}
            // MenuProps={MenuProps}
            >
              {rejectReasons.map((reason) => (
                <MenuItem key={reason.id} value={reason}>
                  <Checkbox color={"primary"} checked={rejectionReasons.some(i => i.id === reason.id) }/>
                  <ListItemText primary={reason.text} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            value={messageEnd}
            name="messageEnd"
            label="Message End"
            type="text"
            onChange={(e) => setMessageEnd(e.target.value)}
            fullWidth
            className={classes.entryField}
            multiline
          />

          <TextField
            value={messageSignature}
            name="signature"
            label="Signature"
            type="text"
            onChange={(e) => setMessageEnd(e.target.value)}
            fullWidth
            className={classes.entryField}
            multiline
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose()}>
            Cancel
          </Button>
          <Button onClick={sendClicked}
            color="primary" disabled={rejectionReasons.length === 0} >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SharePopUp