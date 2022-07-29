import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ReviewItem from './ReviewItem';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => ({
    rating: { marginBottom: theme.spacing(4) },
    overallRating: { marginTop: theme.spacing(2) },
    nameField: { paddingRight: theme.spacing(2), paddingBottom: theme.spacing(2) }
}))


const ReviewBlock = ({ reviewData = {}, updateReview }) => {
    const classes = useStyles();
    const readOnly = !updateReview

    const overallRating = (rating) => {
        if (updateReview) { updateReview({ "overall": rating }) }
    }

    return (
        <React.Fragment>
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" className={classes.rating}>
                <Grid item xs={12} md={3} className={classes.nameField}>
                    {readOnly ? (<Typography variant="h5" color="textPrimary">
                        {reviewData.name}
                    </Typography>) : (
                        <TextField
                            name={reviewData.name}
                            label={"Name"}
                            value={reviewData.name}
                            onChange={(e) => updateReview({ "name": e.target.value })}
                            fullWidth />
                    )}
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container direction="column">
                        {reviewData.categories.map((item) => <ReviewItem key={item.name} data={item} updateReview={updateReview} />)}

                    </Grid>
                    <Grid container direction="row" alignItems="flex-end" className={classes.overallRating}>
                        <Grid item xs={5} md={3}>
                            <IconButton disabled={readOnly} onClick={() => { overallRating(true) }} size="large">
                                <ThumbUpIcon style={
                                    ('overall' in reviewData) && reviewData.overall ? { fill: "green" } : {}} />
                            </IconButton>
                            <IconButton disabled={readOnly} onClick={() => { overallRating(false) }} size="large">
                                <ThumbDownIcon style={
                                    ('overall' in reviewData) && !reviewData.overall ? { fill: "red" } : {}} />
                            </IconButton>
                        </Grid>
                        <Grid item xs={7} md={9}>
                            <TextField className={classes.answer}
                                name={"Overall"}
                                label={"Overall"}
                                value={reviewData.comment}
                                onChange={(e) => updateReview({ "comment": e.target.value })}
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