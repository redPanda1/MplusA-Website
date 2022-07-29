import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


const ReviewItem = ({ data, updateReview, name }) => {
    const classes = useStyles();
    const readOnly = !updateReview

    return (
        <React.Fragment>
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" >
                <Grid item xs={12} md={3}>
                    <Box borderColor="transparent" component="fieldset">
                        <Typography component="legend">{data.name}</Typography>
                        <Rating
                            name={name}
                            value={data.rating}
                            disabled={readOnly}
                            onChange={(_event, rating) => {
                                console.log("Clicked")
                                updateReview({ "categories": { "name": data.name, "rating": rating } })
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <TextField className={classes.answer}
                        name={data.name}
                        label={data.name}
                        value={data.comment}
                        inputProps={{
                            readOnly: Boolean(readOnly),
                            disabled: Boolean(readOnly),
                        }}
                        onChange={(e) => {
                            updateReview({ "categories": { "name": data.name, "comment": e.target.value } })
                        }}
                        multiline
                        fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ReviewItem





