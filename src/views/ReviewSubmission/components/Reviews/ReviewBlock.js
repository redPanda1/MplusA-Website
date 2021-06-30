import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import ReviewItem from './ReviewItem';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => ({
    rating: { marginBottom: theme.spacing(4) },
    overallRating: { marginTop: theme.spacing(2) },
    nameField : { paddingRight: theme.spacing(2), paddingBottom: theme.spacing(2) }
}))


const ReviewBlock = ({ reviewData = {}, updateReview }) => {
    const classes = useStyles();
    const readOnly = !updateReview

    const overallRating = (rating) => {
        if (updateReview) {updateReview({"overall":rating})}
    }

    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.rating}>
                <Grid item xs={12} md={3} className={classes.nameField}>
                    {readOnly ? (<Typography variant="h5" color="textPrimary">
                        {reviewData.name}
                    </Typography>) : (
                        <TextField
                            label={"Name"}
                            value={reviewData.name}
                            onChange={(e) => updateReview({"name":e.target.value})}
                            fullWidth />
                    )}
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container direction="column">
                        {reviewData.categories.map((item) => <ReviewItem key={item.name} data={item} updateReview={updateReview}/>)}

                    </Grid>
                    <Grid container direction="row" alignItems="flex-end" className={classes.overallRating}>
                        <Grid item xs={3}>
                            <IconButton disabled={readOnly} onClick={() => {overallRating(true)}}>
                                <ThumbUpIcon style={
                                    ('overall' in reviewData) && reviewData.overall ? { fill: "green" } : {}} />
                            </IconButton>
                            <IconButton disabled={readOnly} onClick={() => {overallRating(false)}}>
                                <ThumbDownIcon style={
                                    ('overall' in reviewData) && !reviewData.overall ? { fill: "red" } : {}} />
                            </IconButton>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField className={classes.answer}
                                label={"Overall"}
                                value={reviewData.comment}
                                onChange={(e) => updateReview({"comment":e.target.value})}
                                inputProps={{
                                    readOnly: Boolean(readOnly),
                                    disabled: Boolean(readOnly),
                                }}

                                multiline
                                fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ReviewBlock