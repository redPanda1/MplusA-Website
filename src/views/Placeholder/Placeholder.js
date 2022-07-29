import React from 'react';
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container';
import { Image } from 'components/atoms';
import { makeStyles } from '@mui/styles';
import placeholderIcon from 'assets/images/construction.png'



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


const Placeholder = () => {
    const classes = useStyles()


    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
            <Image
              src={placeholderIcon}
            />
            </Paper>
        </Container>
    )
}

export default Placeholder