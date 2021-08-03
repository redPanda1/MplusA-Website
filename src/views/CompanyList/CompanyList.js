import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import BasicList from './BasicList'
import useCompany from 'hooks/useCompany';




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
    const [{getCompanyList, refreshCompanyData}] = useCompany()

    const sortCompanyList = () => {

    }

    const companyData = getCompanyList()
    console.log(companyData)


    useEffect(() => {
        refreshCompanyData()
      }, []);
    
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