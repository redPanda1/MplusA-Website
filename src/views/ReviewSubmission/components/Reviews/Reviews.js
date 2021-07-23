import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ReviewBlock from './ReviewBlock';

import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    // marginBottom: theme.spacing(1),
  },
  reviewLine: {
    marginBottom: theme.spacing(2)
  },
  button: { marginLeft: theme.spacing(2) }
}));



const Reviews = props => {
  const { className, reviewData, newReview, updateReview, submitReview, shareSubmission, sendFeedback, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 2 : 1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Reviews
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {reviewData.length === 0 ?
            (<Typography variant="h6" color="textPrimary">
              Be the first to review
            </Typography>) :
            (reviewData.map((review) => (
              <div key={review.name} className={classes.reviewLine}>
                <ReviewBlock reviewData={review} />
              </div>)))
          }
        </Grid>

        <Grid item xs={12}>
          <ReviewBlock reviewData={newReview} updateReview={updateReview} />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Button variant="contained" color="secondary" onClick={shareSubmission} className={classes.button}>
                Share
              </Button>
              <Button variant="contained" color="primary" onClick={submitReview} className={classes.button}>
                Submit Review
              </Button>
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </div>
  );
};

Reviews.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Reviews;
