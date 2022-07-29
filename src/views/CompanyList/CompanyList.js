import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import BasicList from './BasicList'
import useCompany from 'hooks/useCompany';
import Footer from 'common/Footer'



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
    const [{getCompanyData, companyData, isLoading, userMessage, dismissMessage}] = useCompany()

    const sortCompanyList = () => {

    }

    useEffect(() => {
        console.log("Calling UseEffect...")
        getCompanyData()
      });
    
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
            <Footer userMessage={userMessage} isLoading={isLoading} close={dismissMessage}/>
        </Container>
    )
}

export default CompanyList