import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Typography, Grid } from '@mui/material';
import BasicList from './BasicList'
import Footer from 'common/Footer'
import useUser from 'hooks/useUser'
  

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


const UserList = () => {
    const classes = useStyles()
    const [{ userData, isLoading, userMessage, getUserData, lockUser, resetUserPassword, dismissMessage }] = useUser()

    console.log(userData)

    // Do once on page load
    useEffect(() => {
        console.log("Calling UseEffect...")
        getUserData()
    })

    const handleResetPassword = (email) => {
        console.log(email)
        resetUserPassword({userName:email})
    }
    const handleLockUser = (id) => {
        console.log(id)
        lockUser({id})
    }

    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={classes.title}>
                    <Grid item>
                        <Typography variant="h5">User List</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12}>
                        <BasicList userData={userData} resetUserPassword={handleResetPassword} lockUser={handleLockUser} />
                    </Grid>
                </Grid>
            </Paper>
            <Footer userMessage={userMessage} isLoading={isLoading} close={dismissMessage}/>

        </Container>
    )
}

export default UserList