import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
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