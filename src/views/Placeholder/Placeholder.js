import React from 'react';
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container';
import { Image } from 'components/atoms';
import { makeStyles } from '@material-ui/styles';
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