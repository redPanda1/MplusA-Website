import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import useCompany from 'hooks/useCompany';

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
    const [{getCompanyList, addCompany, test}] = useCompany()

    // console.log("companyList")
    // console.log(getCompanyList())

    const newCo = () => {
        console.log("Clicked")
        const id = getCompanyList().length + 1
        addCompany({id, name:"PialaSoft LLC", owner:"Simon", details:{}})
        // console.log(getCompanyList())
    }
    const testClick = () => {
        console.log("Clicked")
        test()
        // addCompany({name:"PialaSoft LLC", owner:"Simon"})
        // console.log(getCompanyList())
    }


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
                <Button onClick={newCo}>
                    Click Me!
                </Button>
                <Button onClick={testClick}>
                    Click MeToo!
                </Button>

            </Paper>
        </Container>
    )
}

export default AdminHome