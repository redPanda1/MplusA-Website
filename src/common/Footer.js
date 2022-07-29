import React from 'react';
import { makeStyles } from '@mui/styles';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';



const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyles = makeStyles((theme) => ({
    isLoading: { paddingTop: theme.spacing(2), display: 'flex', justifyContent: 'center' }
}));


const Footer = ({userMessage, isLoading, close}) => {
    const classes = useStyles()

    const handleUserMessgaeClose = (event, reason) => {
        if (reason === 'clickaway') return
        if (close) {
            close()
        }
      }
    
    return (
        <React.Fragment>

            {!!userMessage && (
                <Snackbar open={!!userMessage} autoHideDuration={6000} onClose={handleUserMessgaeClose}>
                    <Alert onClose={handleUserMessgaeClose} severity={userMessage ? userMessage.type : "success"}>
                        {userMessage && userMessage.text}
                    </Alert>
                </Snackbar>
            )}
            {isLoading ? (<div className={classes.isLoading}>
                <CircularProgress />
            </div>) : null}


        </React.Fragment>
    )
}

export default Footer

