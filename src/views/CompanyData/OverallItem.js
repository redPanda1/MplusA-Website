import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


export const OverallItem = ({ ratingData = {comment:""}, updateReview }) => {
    const classes = useStyles();

    console.log(ratingData)

    return (
        <Grid container direction="row" alignItems="flex-end" className={classes.overallRating}>
        <Grid item xs={5} md={3}>
            <IconButton onClick={() => { updateReview({overall:true}) }} size="large">
                <ThumbUpIcon style={
                    ('overall' in ratingData) && ratingData.overall ? { fill: "green" } : {}} />
            </IconButton>
            <IconButton onClick={() => { updateReview({overall:false}) }} size="large">
                <ThumbDownIcon style={
                    ('overall' in ratingData) && !ratingData.overall ? { fill: "red" } : {}} />
            </IconButton>
        </Grid>
        <Grid item xs={7} md={9}>
            <TextField className={classes.answer}
                name={"Overall"}
                label={"Overall"}
                value={ratingData.comment}
                onChange={(e) => updateReview({ comment: e.target.value })}    
                multiline
                fullWidth />
        </Grid>
    </Grid>
    );
}
        