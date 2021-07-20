import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReviewBlock from './ReviewBlock';


const useStyles = makeStyles((theme) => ({
}))



const Reviews = ({ reviews=[], newReview={}, updateReview, submitReview, shareApplication }) => {

    console.log(reviews)
    const classes = useStyles()

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    {reviews.length === 0 ?
                        (<Typography variant="h6" color="textPrimary">
                            Be the first to review
                        </Typography>) :
                        (reviews.map((review) => (
                            <div key={review.name} className={classes.reviewLine}>
                                <ReviewBlock reviewData={review} />
                            </div>)))
                    }
                </Grid>

                <Grid item xs={12}>
                    <ReviewBlock reviewData={newReview} updateReview={updateReview} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="flex-end" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={shareApplication} className={classes.button}>
                                Share
                            </Button>
                            <Button variant="contained" color="primary" onClick={submitReview} className={classes.button}>
                                Submit Review
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>


        </React.Fragment>)
}

export default Reviews