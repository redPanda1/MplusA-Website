import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
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
    // const [userList, setUserList] = useState([])
    // const [userMessage, setUserMessage] = useState();
    // const [spinner, setSpinner] = useState();
    const [{ userData, isLoading, userMessage, getUserData, dismissMessage }] = useUser()

  

    // Do once on page load
    useEffect(() => {
        console.log("Calling UseEffect...")
        getUserData()
    })





    // useEffect(() => {
    //     getUserList()
    // }, [])

    // const getUserList = async () => {
    //     try {
    //         const getUsers = await getUserListAPI()
    //         console.log("Success")
    //         console.log(getUsers.data)
    //         setUserList(getUsers.data)
    //     } catch (error) {
    //         console.log("Error")
    //         console.log(error)
    //     }
    // }

    const lockUser = async (id) => {
        // try {
        //     setSpinner(true)
        //     const lockUser = await lockUserAPI(id)
        //     console.log("Success")
        //     console.log(lockUser.data)

        //     // update data
        //     const newUserList = userList.map((user) => {
        //         if (user.id === id) {
        //             return { ...user, ...lockUser.data }
        //         } else {
        //             return user
        //         }
        //     })
        //     setUserList(newUserList)
        //     setUserMessage({ type: "success", text: "User updated" })
        //     setSpinner(false)

        // } catch (error) {
        //     console.log("Error")
        //     console.log(error)
        // }
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
                        <BasicList userData={userData} lockUser={lockUser} />
                    </Grid>
                </Grid>
            </Paper>
            <Footer userMessage={userMessage} isLoading={isLoading} close={dismissMessage}/>

        </Container>
    )
}

export default UserList