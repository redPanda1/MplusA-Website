import React, { useState } from 'react';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import Footer from 'common/Footer'


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        backgroundColor: "#F7F9FF",
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));


const AdminHome = () => {
    const classes = useStyles()
    const [userMessage, setUserMessage] = useState();
    const [spinner, setSpinner] = useState();

    const dismissMessage = () => {
        setUserMessage()
    }

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={classes.title}>
                    <Grid item>
                        <Typography variant="h5">Submission List</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12}>


                    </Grid>
                </Grid>
            </Paper>
            <Footer userMessage={userMessage} isLoading={spinner} close={dismissMessage}/>
        </Container>
    )
}

export default AdminHome