import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


const ChallengesForm = ({formData, updateData}) => {
    const classes = useStyles();
    const { reason = "" } = formData
    const { mentorship = "" } = formData

    return (
        <React.Fragment>
            <Typography variant="h6" className={classes.question}>
                Why are you reaching out to M+A?
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={reason}
                        onChange={(e) => {updateData({'reason': e.target.value})}}    
                        id="reason"
                        name="reason"
                        label="Reason"
                        multiline
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" className={classes.question}>
                In addition to fundraising are you interested in mentorship?
            </Typography>
            <Typography gutterBottom>
                If yes, what kind of help are you looking for?
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={mentorship}
                    onChange={(e) => {updateData({'mentorship': e.target.value})}}
                    id="mentorship"
                    name="mentorship"
                    label="Mentorship"
                    multiline
                    fullWidth
            />
            </Grid>


        </React.Fragment>
    );
}

export default ChallengesForm