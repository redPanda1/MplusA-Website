import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
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

    const resetClicked = () => {
        console.log("Reset Clicked!!! " )
        // Check for lower/upper/numeric/length
        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
                <DialogTitle id="share submission pop-up" onClose={handleClose}>
                    Password Reset Request
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Sorry - this is not yet implemented. If you need a password reset - please contact Simon
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>
                        Cancel
                    </Button>
                    <Button onClick={resetClicked}
                        color="primary" disabled={false} >
                        Reset
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PasswordPopUp