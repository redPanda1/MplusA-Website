import React from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';


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

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    Dashboard
                </Typography>
            </Paper>
        </Container>
    )
}

export default AdminHome