import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

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
    const [value, setValue] = React.useState(2);

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h5">
                    Dashboard
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Paper>
        </Container>
    )
}

export default AdminHome