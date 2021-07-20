import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';

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
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => onClose()}>
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