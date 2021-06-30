import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


const ReviewItem = ({ data, updateReview }) => {
    const classes = useStyles();
    const readOnly = !updateReview

    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                <Grid item xs={4} md={3}>
                    <Box borderColor="transparent" component="fieldset">
                        <Typography component="legend">{data.name}</Typography>
                        <Rating
                            value={data.rating}
                            disabled={readOnly}
                            onChange={(event, rating) => {
                                updateReview({"categories": {"name": data.name, "rating": rating}})
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={8} md={9}>
                    <TextField className={classes.answer}
                        label={data.name}
                        value={data.comment}
                        inputProps={{
                            readOnly: Boolean(readOnly),
                            disabled: Boolean(readOnly),
                          }}
                        onChange={(e) => {
                            updateReview({"categories": {"name": data.name, "comment": e.target.value}})
                        }}
                        multiline
                        fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ReviewItem





