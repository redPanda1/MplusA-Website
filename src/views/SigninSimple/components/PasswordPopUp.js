import React from 'react';
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

const PasswordPopUp = ({ open, handleClose, data }) => {
    const classes = useStyles()
    const [password1, setPassword1] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [password2Helper, setPassword2Helper] = React.useState("");

    const passwordChangeHandler = (passwordUpdate) => {
        if ('password1' in passwordUpdate) {
            setPassword1(passwordUpdate.password1 || "")
        }
        if ('password2' in passwordUpdate) {
            setPassword2(passwordUpdate.password2 || "")
            if (passwordUpdate.password2.length >= password1.length) {
                if (passwordUpdate.password2 !== password1) {
                    setPassword2Helper("Passwords do not match")
                    return
                }
            }
        }
        setPassword2Helper()
    }

    const resetClicked = () => {
        console.log("Clicked!!! " + password1)
        // Check for lower/upper/numeric/length
        if (password1.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/)) {
            console.log("Passed")

        } else {
            console.log("FAil")
            setPassword2Helper(`${password1} is not a valid password`)
        }
        handleClose({ ...data, password: password1 })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
                <DialogTitle id="share submission pop-up" onClose={handleClose}>
                    Password Reset Required
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Password must include numeric, upper and lower case characters and be a minimum of 6 characters:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        value={password1}
                        onChange={(e) => passwordChangeHandler({ password1: e.target.value })}
                        id="password1"
                        name="password1"
                        label="Password"
                        type="password"
                        fullWidth
                        className={classes.entryField}
                    />
                    <TextField
                        required
                        value={password2}
                        helperText={password2Helper}
                        error={!!password2Helper}
                        onChange={(e) => passwordChangeHandler({ password2: e.target.value })}
                        id="password2"
                        name="password2"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        className={classes.entryField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>
                        Cancel
                    </Button>
                    <Button onClick={resetClicked}
                        color="primary" disabled={password1.length < 6 || password2.length < 6 } >
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PasswordPopUp