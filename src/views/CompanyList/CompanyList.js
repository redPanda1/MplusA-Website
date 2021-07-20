import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import BasicList from './BasicList'
import {getCompanyListAPI} from 'requests/company'




const useStyles = makeStyles((theme) => ({
    container: { 
        padding: theme.spacing(2),  
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));


const CompanyList = () => {
    const classes = useStyles()
    const [companyData, setCompanyData] = useState([])

    const sortCompanyList = () => {

    }

    useEffect(() => {
        getCompanyListAPI()
        .then((response) => {
            console.log("Success")
            console.log(response.data)
            setCompanyData(response.data)})
        .catch((error) => {
            console.log("error")
            console.log(error.name)
            console.log(error.message)})

    }, [])


    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={classes.title}>
                    <Grid item>
                        <Typography variant="h5">Company List</Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={12}>
                        <BasicList companyList={companyData} sortData={sortCompanyList}/>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CompanyList