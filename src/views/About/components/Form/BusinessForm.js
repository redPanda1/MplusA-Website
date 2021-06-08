import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    question: { marginTop: theme.spacing(4) }
}))


const BusinessForm = ({formData, updateData}) => {
    const classes = useStyles();
    const { problem = "" } = formData
    const { solution = "" } = formData
    const { customer = "" } = formData
    const { technology = "" } = formData
    const { progress = "" } = formData

    return (
        <React.Fragment>
            <Typography variant="h6" className={classes.question}>
                What problem are you trying to solve?
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={problem}
                        onChange={(e) => {updateData({'problem': e.target.value})}}
                        id="problem"
                        name="problem"
                        label="Problem"
                        multiline
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6" className={classes.question}>
                In one to two sentences, what is your solution?
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={solution}
                    onChange={(e) => {updateData({'solution': e.target.value})}}
                    id="solution"
                    name="solution"
                    label="Solution"
                    multiline
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
            Who is your ideal customer?     
        </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={customer}
                    onChange={(e) => {updateData({'customer': e.target.value})}}
                    id="customer"
                    name="customer"
                    label="Ideal Customer"
                    multiline
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                How are you leveraging technology? (if applicable)
            </Typography>
            <Grid item xs={12}>
                <TextField
                    value={technology}
                    onChange={(e) => {updateData({'technology': e.target.value})}}
                    id="technology"
                    name="technology"
                    label="Technology"
                    multiline
                    fullWidth
                />
            </Grid>
            <Typography variant="h6" className={classes.question}>
                Tell us about your progress so far 
            </Typography>
            <Typography gutterBottom>
                (stage, revenue, users, milestones reached)
            </Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    value={progress}
                    onChange={(e) => {updateData({'progress': e.target.value})}}
                    id="progress"
                    name="progress"
                    label="Progress"
                    multiline
                    fullWidth
                />
            </Grid>

        </React.Fragment>
    );
}

export default BusinessForm